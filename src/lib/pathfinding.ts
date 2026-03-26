// A* pathfinding algorithm for delivery route calculation

export type Point = { r: number; c: number };

const ROWS = 20;
const COLS = 30;

const neighbors = (r: number, c: number): [number, number][] =>
  ([
    [r - 1, c],
    [r + 1, c],
    [r, c - 1],
    [r, c + 1],
  ] as [number, number][]).filter(([nr, nc]) => nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS);

const heuristic = (a: Point, b: Point) =>
  Math.abs(a.r - b.r) + Math.abs(a.c - b.c);

/**
 * Generate random obstacles on the grid (simulating roads/buildings)
 */
export const generateObstacles = (
  start: Point,
  end: Point,
  density = 0.25
): Set<string> => {
  const walls = new Set<string>();
  const key = (r: number, c: number) => `${r},${c}`;
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if ((r === start.r && c === start.c) || (r === end.r && c === end.c)) continue;
      if (Math.random() < density) walls.add(key(r, c));
    }
  }
  return walls;
};

export type PathResult = {
  path: [number, number][];
  visited: [number, number][];
  found: boolean;
  distance: number;
};

/**
 * A* search — finds the optimal path from start to end
 */
export const findRoute = (
  start: Point,
  end: Point,
  walls: Set<string>
): PathResult => {
  const key = (r: number, c: number) => `${r},${c}`;
  const parent = new Map<string, string>();
  const visited: [number, number][] = [];

  const open: { r: number; c: number; g: number; f: number }[] = [
    { r: start.r, c: start.c, g: 0, f: heuristic(start, end) },
  ];
  const gScore = new Map<string, number>([[key(start.r, start.c), 0]]);
  const closed = new Set<string>();
  let found = false;

  while (open.length > 0) {
    open.sort((a, b) => a.f - b.f);
    const current = open.shift()!;
    const ck = key(current.r, current.c);
    if (current.r === end.r && current.c === end.c) {
      found = true;
      break;
    }
    if (closed.has(ck)) continue;
    closed.add(ck);
    if (current.r !== start.r || current.c !== start.c) {
      visited.push([current.r, current.c]);
    }

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

  const path: [number, number][] = [];
  if (found) {
    let cur = key(end.r, end.c);
    while (cur && cur !== key(start.r, start.c)) {
      const [pr, pc] = cur.split(",").map(Number);
      if (pr !== end.r || pc !== end.c) path.unshift([pr, pc]);
      cur = parent.get(cur)!;
    }
  }

  return { path, visited, found, distance: found ? path.length + 1 : 0 };
};

export const GRID_ROWS = ROWS;
export const GRID_COLS = COLS;
