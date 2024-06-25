#!/usr/bin/env python3
''' This module defines a class '''

from base_caching import BaseCaching as Base


class LFUCache(Base):
    ''' Improves the base class '''

    def __init__(self):
        ''' This is to add an incrementing mechanism '''
        super().__init__()
        self.access_times = {}

    def put(self, key, item):
        ''' This insert an item into the cache and
            moves the item to the front of the queue '''

        if key is not None and item is not None:
            if key in self.cache_data:
                self.access_times[key] += 1

            else:
                if len(self.cache_data) == self.MAX_ITEMS:
                    mi = min([i for i in self.access_times.values()])
                    old_min = [(i, j) for i, j in self.access_times.items()
                               if j == mi][0]

                    print("DISCARD: {}".format(old_min[0]))
                    del self.cache_data[old_min[0]]
                    del self.access_times[old_min[0]]

                self.cache_data[key] = item
                self.access_times[key] = 0

    def get(self, key):
        ''' This retrieves an item from the cache and
            moves the accessed item to the front of the queue '''

        if key in self.cache_data:
            self.access_times[key] += 1

        return self.cache_data.get(key, None)
