import { useState, useCallback, useRef, useEffect } from "react";
import { Play, RotateCcw, MapPin, Navigation } from "lucide-react";
import Footer from "@/components/Footer";

type CellType = "empty" | "wall" | "start" | "end" | "visited" | "path";
type Algorithm = "bfs" | "dfs" | "astar";

const ROWS = 20;
const COLS = 30;
const DEFAULT_START = { r: 2, c: 2 };
const DEFAULT_END = { r: 17, c: 27 };

const createGrid = (): CellType[][] =>
  Array.from({ length: ROWS }, () => Array(COLS).fill("empty"));

const neighbors = (r: number, c: number) =>
  [
    [r - 1, c],
    [r + 1, c],
    [r, c - 1],
    [r, c + 1],
  ].filter(([nr, nc]) => nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS);

const heuristic = (a: { r: number; c: number }, b: { r: number; c: number }) =>
  Math.abs(a.r - b.r) + Math.abs(a.c - b.c);

const DeliveryRoutePage = () => {
  const [grid, setGrid] = useState<CellType[][]>(() => {
    const g = createGrid();
    g[DEFAULT_START.r][DEFAULT_START.c] = "start";
    g[DEFAULT_END.r][DEFAULT_END.c] = "end";
    return g;
  });
  const [algo, setAlgo] = useState<Algorithm>("astar");
  const [running, setRunning] = useState(false);
  const [drawMode, setDrawMode] = useState<"wall" | "start" | "end">("wall");
  const [stats, setStats] = useState({ visited: 0, pathLen: 0, time: 0 });
  const mouseDown = useRef(false);
  const startRef = useRef(DEFAULT_START);
  const endRef = useRef(DEFAULT_END);

  const resetGrid = useCallback(() => {
    const g = createGrid();
    startRef.current = DEFAULT_START;
    endRef.current = DEFAULT_END;
    g[DEFAULT_START.r][DEFAULT_START.c] = "start";
    g[DEFAULT_END.r][DEFAULT_END.c] = "end";
    setGrid(g);
    setStats({ visited: 0, pathLen: 0, time: 0 });
  }, []);

  const clearPath = useCallback(() => {
    setGrid((prev) =>
      prev.map((row) =>
        row.map((cell) => (cell === "visited" || cell === "path" ? "empty" : cell))
      )
    );
    setStats({ visited: 0, pathLen: 0, time: 0 });
  }, []);

  const handleCellInteraction = useCallback(
    (r: number, c: number) => {
      if (running) return;
      setGrid((prev) => {
        const g = prev.map((row) => [...row]);
        if (drawMode === "start") {
          // clear old start
          g[startRef.current.r][startRef.current.c] = "empty";
          g[r][c] = "start";
          startRef.current = { r, c };
        } else if (drawMode === "end") {
          g[endRef.current.r][endRef.current.c] = "empty";
          g[r][c] = "end";
          endRef.current = { r, c };
        } else {
          if (g[r][c] === "start" || g[r][c] === "end") return prev;
          g[r][c] = g[r][c] === "wall" ? "empty" : "wall";
        }
        return g;
      });
    },
    [running, drawMode]
  );

  const runAlgorithm = useCallback(async () => {
    clearPath();
    setRunning(true);
    const t0 = performance.now();
    const start = startRef.current;
    const end = endRef.current;

    // get current walls
    const walls = new Set<string>();
    grid.forEach((row, r) =>
      row.forEach((cell, c) => {
        if (cell === "wall") walls.add(`${r},${c}`);
      })
    );

    const visited: [number, number][] = [];
    const parent = new Map<string, string>();
    const key = (r: number, c: number) => `${r},${c}`;
    let found = false;

    if (algo === "bfs") {
      const queue: [number, number][] = [[start.r, start.c]];
      const seen = new Set<string>([key(start.r, start.c)]);
      while (queue.length > 0) {
        const [cr, cc] = queue.shift()!;
        if (cr === end.r && cc === end.c) { found = true; break; }
        for (const [nr, nc] of neighbors(cr, cc)) {
          const k = key(nr, nc);
          if (!seen.has(k) && !walls.has(k)) {
            seen.add(k);
            parent.set(k, key(cr, cc));
            if (nr !== end.r || nc !== end.c) visited.push([nr, nc]);
            queue.push([nr, nc]);
          }
        }
      }
    } else if (algo === "dfs") {
      const stack: [number, number][] = [[start.r, start.c]];
      const seen = new Set<string>([key(start.r, start.c)]);
      while (stack.length > 0) {
        const [cr, cc] = stack.pop()!;
        if (cr === end.r && cc === end.c) { found = true; break; }
        for (const [nr, nc] of neighbors(cr, cc)) {
          const k = key(nr, nc);
          if (!seen.has(k) && !walls.has(k)) {
            seen.add(k);
            parent.set(k, key(cr, cc));
            if (nr !== end.r || nc !== end.c) visited.push([nr, nc]);
            stack.push([nr, nc]);
          }
        }
      }
    } else {
      // A*
      const open: { r: number; c: number; g: number; f: number }[] = [
        { r: start.r, c: start.c, g: 0, f: heuristic(start, end) },
      ];
      const gScore = new Map<string, number>([[key(start.r, start.c), 0]]);
      const closed = new Set<string>();

      while (open.length > 0) {
        open.sort((a, b) => a.f - b.f);
        const current = open.shift()!;
        const ck = key(current.r, current.c);
        if (current.r === end.r && current.c === end.c) { found = true; break; }
        if (closed.has(ck)) continue;
        closed.add(ck);
        if (current.r !== start.r || current.c !== start.c) visited.push([current.r, current.c]);

        for (const [nr, nc] of neighbors(current.r, current.c)) {
          const nk = key(nr, nc);
          if (walls.has(nk) || closed.has(nk)) continue;
          const tentG = current.g + 1;
          if (tentG < (gScore.get(nk) ?? Infinity)) {
            gScore.set(nk, tentG);
            parent.set(nk, ck);
            open.push({ r: nr, c: nc, g: tentG, f: tentG + heuristic({ r: nr, c: nc }, end) });
          }
        }
      }
    }

    // Animate visited cells
    for (let i = 0; i < visited.length; i++) {
      const [vr, vc] = visited[i];
      setGrid((prev) => {
        const g = prev.map((row) => [...row]);
        g[vr][vc] = "visited";
        return g;
      });
      if (i % 3 === 0) await new Promise((r) => setTimeout(r, 10));
    }

    // Reconstruct path
    const path: [number, number][] = [];
    if (found) {
      let cur = key(end.r, end.c);
      while (cur && cur !== key(start.r, start.c)) {
        const [pr, pc] = cur.split(",").map(Number);
        if (pr !== end.r || pc !== end.c) path.unshift([pr, pc]);
        cur = parent.get(cur)!;
      }
      for (let i = 0; i < path.length; i++) {
        const [pr, pc] = path[i];
        setGrid((prev) => {
          const g = prev.map((row) => [...row]);
          g[pr][pc] = "path";
          return g;
        });
        await new Promise((r) => setTimeout(r, 25));
      }
    }

    setStats({
      visited: visited.length,
      pathLen: found ? path.length + 1 : 0,
      time: Math.round(performance.now() - t0),
    });
    setRunning(false);
  }, [algo, grid, clearPath]);

  const cellColor = (type: CellType) => {
    switch (type) {
      case "wall": return "bg-foreground/80";
      case "start": return "bg-green-500";
      case "end": return "bg-accent";
      case "visited": return "bg-primary/30";
      case "path": return "bg-primary";
      default: return "bg-card";
    }
  };

  return (
    <main className="pt-16">
      <div className="bg-dark-wood py-16 text-center">
        <p className="font-body text-sm tracking-[0.2em] uppercase text-primary mb-2">Smart Delivery</p>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-cream">Route Optimizer</h1>
        <p className="font-body text-cream/70 mt-3 max-w-lg mx-auto">
          Visualize how BFS, DFS, and A* algorithms find the shortest delivery route from restaurant to customer.
        </p>
        <div className="w-20 h-1 bg-gradient-warm mx-auto mt-4 rounded-full" />
      </div>

      <div className="container mx-auto px-4 py-10">
        {/* Controls */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
          {(["bfs", "dfs", "astar"] as Algorithm[]).map((a) => (
            <button
              key={a}
              onClick={() => setAlgo(a)}
              disabled={running}
              className={`font-body text-sm font-medium px-5 py-2 rounded-full transition-all duration-200 ${
                algo === a
                  ? "bg-primary text-primary-foreground shadow-[var(--shadow-warm)]"
                  : "bg-card text-muted-foreground hover:text-foreground hover:bg-muted border border-border"
              }`}
            >
              {a === "astar" ? "A* Search" : a.toUpperCase()}
            </button>
          ))}

          <div className="w-px h-8 bg-border mx-2 hidden sm:block" />

          {(["wall", "start", "end"] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setDrawMode(mode)}
              disabled={running}
              className={`font-body text-xs font-medium px-4 py-2 rounded-full flex items-center gap-1.5 transition-all ${
                drawMode === mode
                  ? "bg-secondary text-secondary-foreground"
                  : "bg-card text-muted-foreground border border-border hover:bg-muted"
              }`}
            >
              {mode === "start" && <MapPin className="w-3.5 h-3.5" />}
              {mode === "end" && <Navigation className="w-3.5 h-3.5" />}
              {mode === "wall" ? "Draw Walls" : mode === "start" ? "Set Restaurant" : "Set Customer"}
            </button>
          ))}

          <div className="w-px h-8 bg-border mx-2 hidden sm:block" />

          <button
            onClick={runAlgorithm}
            disabled={running}
            className="flex items-center gap-1.5 bg-primary text-primary-foreground font-body font-medium text-sm px-5 py-2 rounded-full hover:bg-primary/90 disabled:opacity-50 transition-all"
          >
            <Play className="w-4 h-4" /> {running ? "Running..." : "Find Route"}
          </button>
          <button
            onClick={resetGrid}
            disabled={running}
            className="flex items-center gap-1.5 bg-card text-muted-foreground font-body text-sm px-4 py-2 rounded-full border border-border hover:bg-muted disabled:opacity-50 transition-all"
          >
            <RotateCcw className="w-4 h-4" /> Reset
          </button>
        </div>

        {/* Stats */}
        {stats.visited > 0 && (
          <div className="flex justify-center gap-6 mb-6">
            <div className="text-center">
              <p className="font-display text-2xl font-bold text-primary">{stats.visited}</p>
              <p className="font-body text-xs text-muted-foreground">Cells Explored</p>
            </div>
            <div className="text-center">
              <p className="font-display text-2xl font-bold text-primary">{stats.pathLen || "N/A"}</p>
              <p className="font-body text-xs text-muted-foreground">Path Length</p>
            </div>
            <div className="text-center">
              <p className="font-display text-2xl font-bold text-primary">{stats.time}ms</p>
              <p className="font-body text-xs text-muted-foreground">Time Taken</p>
            </div>
          </div>
        )}

        {/* Grid */}
        <div className="overflow-x-auto pb-4">
          <div
            className="mx-auto border border-border rounded-lg overflow-hidden select-none"
            style={{ width: "fit-content" }}
            onMouseLeave={() => (mouseDown.current = false)}
          >
            {grid.map((row, r) => (
              <div key={r} className="flex">
                {row.map((cell, c) => (
                  <div
                    key={c}
                    className={`w-5 h-5 sm:w-6 sm:h-6 border border-border/30 transition-colors duration-150 cursor-pointer ${cellColor(cell)}`}
                    onMouseDown={() => {
                      mouseDown.current = true;
                      handleCellInteraction(r, c);
                    }}
                    onMouseEnter={() => {
                      if (mouseDown.current && drawMode === "wall") handleCellInteraction(r, c);
                    }}
                    onMouseUp={() => (mouseDown.current = false)}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-4 mt-6 font-body text-xs text-muted-foreground">
          {[
            ["bg-green-500", "Restaurant"],
            ["bg-accent", "Customer"],
            ["bg-foreground/80", "Obstacle"],
            ["bg-primary/30", "Explored"],
            ["bg-primary", "Shortest Path"],
          ].map(([color, label]) => (
            <div key={label} className="flex items-center gap-1.5">
              <div className={`w-4 h-4 rounded-sm ${color}`} />
              <span>{label}</span>
            </div>
          ))}
        </div>

        {/* Algorithm Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {[
            {
              title: "BFS (Breadth-First)",
              desc: "Explores all neighbors level by level. Guarantees the shortest path in unweighted grids. Like delivering to every nearby house before going further.",
            },
            {
              title: "DFS (Depth-First)",
              desc: "Dives deep into one direction before backtracking. Fast but doesn't guarantee the shortest path. Like taking one road until it dead-ends.",
            },
            {
              title: "A* Search",
              desc: "Uses a heuristic (Manhattan distance) to prioritize cells closer to the goal. Fastest to find the optimal path — ideal for real delivery routing.",
            },
          ].map((info) => (
            <div key={info.title} className="bg-card rounded-lg p-6 border border-border">
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">{info.title}</h3>
              <p className="font-body text-sm text-muted-foreground">{info.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default DeliveryRoutePage;
