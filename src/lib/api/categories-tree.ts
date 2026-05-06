// Tree helpers for nested categories. Backend returns a flat list with
// `parentId` populated; clients use these helpers to render hierarchies in
// the nav, mobile drawer, and /products sidebar.
import type { CategoryDTO } from "./server";

export interface CategoryNode extends CategoryDTO {
  children: CategoryNode[];
  /** Sum of `productCount` across this node and all descendants. */
  totalProductCount: number;
}

export function buildCategoryTree(flat: CategoryDTO[]): CategoryNode[] {
  const byId = new Map<number, CategoryNode>();
  for (const c of flat) byId.set(c.id, { ...c, children: [], totalProductCount: c.productCount });

  const roots: CategoryNode[] = [];
  for (const c of flat) {
    const node = byId.get(c.id)!;
    if (c.parentId != null && byId.has(c.parentId)) {
      byId.get(c.parentId)!.children.push(node);
    } else {
      roots.push(node);
    }
  }

  const sortAndRoll = (nodes: CategoryNode[]): number => {
    nodes.sort((a, b) => a.sortOrder - b.sortOrder || a.id - b.id);
    let sum = 0;
    for (const n of nodes) {
      const childSum = sortAndRoll(n.children);
      n.totalProductCount = n.productCount + childSum;
      sum += n.totalProductCount;
    }
    return sum;
  };
  sortAndRoll(roots);
  return roots;
}

/**
 * Returns the full ancestor chain of the given slug (root → … → leaf).
 * Empty if slug isn't found. Used to drive breadcrumbs and to detect when a
 * sibling sub-category is "active" so the parent's accordion auto-expands.
 */
export function findCategoryPath(flat: CategoryDTO[], slug: string): CategoryDTO[] {
  const byId = new Map<number, CategoryDTO>();
  for (const c of flat) byId.set(c.id, c);
  const target = flat.find((c) => c.slug === slug);
  if (!target) return [];
  const path: CategoryDTO[] = [target];
  let cursor: CategoryDTO | undefined = target;
  while (cursor && cursor.parentId != null) {
    const parent = byId.get(cursor.parentId);
    if (!parent) break;
    path.unshift(parent);
    cursor = parent;
  }
  return path;
}
