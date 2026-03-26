import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { CheckCircle, Clock, MapPin, Navigation, Bike } from "lucide-react";
import Footer from "@/components/Footer";
import {
  findRoute,
  generateObstacles,
  GRID_ROWS,
  GRID_COLS,
  type Point,
} from "@/lib/pathfinding";

type CellType = "empty" | "wall" | "start" | "end" | "visited" | "path" | "rider";

const RESTAURANT: Point = { r: 2, c: 3 };
const CUSTOMER: Point = { r: 17, c: 26 };

const OrderTrackingPage = () => {
  const [grid, setGrid] = useState<CellType[][]>([]);
  const [phase, setPhase] = useState<"calculating" | "delivering" | "delivered">("calculating");
  const [eta, setEta] = useState(0);
  const [progress, setProgress] = useState(0);
  const [pathLength, setPathLength] = useState(0);

  const initRoute = useCallback(async () => {
    // Generate city-like obstacles
    const walls = generateObstacles(RESTAURANT, CUSTOMER, 0.22);
    const result = findRoute(RESTAURANT, CUSTOMER, walls);

    // Build initial grid
    const g: CellType[][] = Array.from({ length: GRID_ROWS }, () =>
      Array(GRID_COLS).fill("empty") as CellType[]
    );
    walls.forEach((k) => {
      const [r, c] = k.split(",").map(Number);
      g[r][c] = "wall";
    });
    g[RESTAURANT.r][RESTAURANT.c] = "start";
    g[CUSTOMER.r][CUSTOMER.c] = "end";
    setGrid(g.map((row) => [...row]));

    if (!result.found) {
      // Retry with fewer obstacles
      const walls2 = generateObstacles(RESTAURANT, CUSTOMER, 0.12);
      const result2 = findRoute(RESTAURANT, CUSTOMER, walls2);
      if (!result2.found) return;
      return animateRoute(g, result2, walls2);
    }

    await animateRoute(g, result, walls);
  }, []);

  const animateRoute = async (
    baseGrid: CellType[][],
    result: ReturnType<typeof findRoute>,
    _walls: Set<string>
  ) => {
    const estimatedMinutes = Math.max(15, Math.round(result.distance * 1.2));
    setEta(estimatedMinutes);
    setPathLength(result.distance);

    // Animate exploration (fast)
    for (let i = 0; i < result.visited.length; i++) {
      const [vr, vc] = result.visited[i];
      setGrid((prev) => {
        const g = prev.map((row) => [...row]);
        g[vr][vc] = "visited";
        return g;
      });
      if (i % 5 === 0) await new Promise((r) => setTimeout(r, 8));
    }

    // Show optimal path
    for (let i = 0; i < result.path.length; i++) {
      const [pr, pc] = result.path[i];
      setGrid((prev) => {
        const g = prev.map((row) => [...row]);
        g[pr][pc] = "path";
        return g;
      });
      await new Promise((r) => setTimeout(r, 20));
    }

    setPhase("delivering");

    // Animate rider along the path
    const fullPath: [number, number][] = [[RESTAURANT.r, RESTAURANT.c], ...result.path, [CUSTOMER.r, CUSTOMER.c]];
    for (let i = 0; i < fullPath.length; i++) {
      const [rr, rc] = fullPath[i];
      setGrid((prev) => {
        const g = prev.map((row) => [...row]);
        // Clear previous rider position
        if (i > 0) {
          const [pr, pc] = fullPath[i - 1];
          g[pr][pc] = i - 1 === 0 ? "start" : "path";
        }
        g[rr][rc] = "rider";
        return g;
      });
      setProgress(Math.round((i / (fullPath.length - 1)) * 100));
      await new Promise((r) => setTimeout(r, 80));
    }

    setPhase("delivered");
  };

  useEffect(() => {
    initRoute();
  }, [initRoute]);

  const cellColor = (type: CellType) => {
    switch (type) {
      case "wall": return "bg-muted-foreground/20";
      case "start": return "bg-primary";
      case "end": return "bg-accent";
      case "visited": return "bg-primary/10";
      case "path": return "bg-primary/40";
      case "rider": return "bg-green-500";
      default: return "bg-card";
    }
  };

  return (
    <main className="pt-16">
      <div className="bg-dark-wood py-12 text-center">
        <p className="font-body text-sm tracking-[0.2em] uppercase text-primary mb-2">Order Confirmed</p>
        <h1 className="font-display text-3xl md:text-4xl font-bold text-cream">Tracking Your Delivery</h1>
        <div className="w-20 h-1 bg-gradient-warm mx-auto mt-4 rounded-full" />
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Status bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex items-center justify-between mb-4">
            {[
              { icon: CheckCircle, label: "Order Placed", active: true },
              { icon: MapPin, label: "Route Found", active: phase !== "calculating" },
              { icon: Bike, label: "On the Way", active: phase === "delivering" || phase === "delivered" },
              { icon: Navigation, label: "Delivered", active: phase === "delivered" },
            ].map((step, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <step.icon className={`w-6 h-6 ${step.active ? "text-primary" : "text-muted-foreground/40"}`} />
                <span className={`font-body text-xs ${step.active ? "text-foreground" : "text-muted-foreground/40"}`}>
                  {step.label}
                </span>
              </div>
            ))}
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-gradient-warm h-2 rounded-full transition-all duration-300"
              style={{ width: `${phase === "calculating" ? 15 : phase === "delivering" ? 30 + progress * 0.65 : 100}%` }}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="flex justify-center gap-8 mb-6">
          <div className="text-center">
            <div className="flex items-center gap-1.5 justify-center">
              <Clock className="w-4 h-4 text-primary" />
              <p className="font-display text-xl font-bold text-foreground">
                {phase === "delivered" ? "Delivered!" : `~${eta} min`}
              </p>
            </div>
            <p className="font-body text-xs text-muted-foreground">Estimated Time</p>
          </div>
          <div className="text-center">
            <p className="font-display text-xl font-bold text-foreground">{pathLength > 0 ? `${(pathLength * 0.15).toFixed(1)} km` : "..."}</p>
            <p className="font-body text-xs text-muted-foreground">Distance</p>
          </div>
          <div className="text-center">
            <p className="font-display text-xl font-bold text-foreground">{progress}%</p>
            <p className="font-body text-xs text-muted-foreground">Progress</p>
          </div>
        </div>

        {/* Grid map */}
        <div className="overflow-x-auto pb-4">
          <div
            className="mx-auto border border-border rounded-lg overflow-hidden select-none"
            style={{ width: "fit-content" }}
          >
            {grid.map((row, r) => (
              <div key={r} className="flex">
                {row.map((cell, c) => (
                  <div
                    key={c}
                    className={`w-4 h-4 sm:w-5 sm:h-5 border border-border/20 transition-colors duration-150 ${cellColor(cell)}`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-4 mt-4 font-body text-xs text-muted-foreground">
          {[
            ["bg-primary", "Restaurant"],
            ["bg-accent", "Your Location"],
            ["bg-muted-foreground/20", "Buildings"],
            ["bg-primary/40", "Delivery Route"],
            ["bg-green-500", "Rider"],
          ].map(([color, label]) => (
            <div key={label} className="flex items-center gap-1.5">
              <div className={`w-3 h-3 rounded-sm ${color}`} />
              <span>{label}</span>
            </div>
          ))}
        </div>

        {phase === "delivered" && (
          <div className="text-center mt-8 animate-fade-in">
            <p className="font-display text-2xl font-bold text-primary mb-2">🎉 Order Delivered!</p>
            <p className="font-body text-muted-foreground mb-6">Enjoy your meal from Spice Heaven!</p>
            <Link
              to="/menu"
              className="bg-gradient-warm text-primary-foreground font-body font-bold px-8 py-3 rounded-full hover:scale-105 transition-transform inline-block"
            >
              Order Again
            </Link>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
};

export default OrderTrackingPage;
