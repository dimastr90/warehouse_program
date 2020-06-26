// This class is sorting object by any field, in ascending or descending order.
// Using: SortingItems.sort(array for sorting, sort field, order('asc' or 'desc'));

export default class SortingItems {

    static sort(items, sortBy, order) {
        if (items.length > 0 && items[0].hasOwnProperty(sortBy) && (order === 'asc' || order === 'desc')) {
            return this._doSort(items, sortBy, order);
        } else {
            return items;
        }
    }

    static _doSort(items, sortBy, order) {
        if (order === 'asc') {
            return items.sort((a, b) => {
                const val1 = typeof a[sortBy] === 'number' ? a[sortBy] : a[sortBy].toLowerCase();
                const val2 = typeof b[sortBy] === 'number' ? b[sortBy] : b[sortBy].toLowerCase();
                if (val1 > val2) {
                    return 1;
                } else if (val1 < val2) {
                    return -1;
                }
                return 0;
            });
        } else {
            return items.sort((a, b) => {
                const val1 = typeof a[sortBy] === 'number' ? a[sortBy] : a[sortBy].toLowerCase();
                const val2 = typeof b[sortBy] === 'number' ? b[sortBy] : b[sortBy].toLowerCase();
                if (val1 < val2) {
                    return 1;
                } else if (val1 > val2) {
                    return -1;
                }
                return 0;
            });
        }
    }

}
