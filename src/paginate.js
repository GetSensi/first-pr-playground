'use strict';

/**
 * Task #5 — Off-by-One Pagination Bug
 *
 * Page numbers start at 1 (page = 1 is the first page).
 *
 * Curious builders: run this to see the bug for yourself:
 *   node -e "const {paginate}=require('./src/paginate');console.log(paginate([1,2,3,4,5,6],1,2))"
 *   // Expected: [1, 2]   Actual: [3, 4]
 */
function paginate(items, page, perPage) {
  // TODO(task-5): There is an intentional off-by-one bug below.
  // For page = 1 the first page should start at index 0, but this uses
  // page * perPage, which skips the entire first page.
  const start = page * perPage;
  const end = start + perPage;
  return items.slice(start, end);
}

module.exports = { paginate };
