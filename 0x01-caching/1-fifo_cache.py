#!/usr/bin/env python3
''' This module defines a class '''

from base_caching import BaseCaching as Base


class FIFOCache(Base):
    ''' Improves the base class '''

    def __init__(self):
        ''' Initializes the instance '''

        super().__init__()

    def put(self, key, item):
        ''' This insert an item into the cache '''

        if key is not None and item is not None:
            self.cache_data[key] = item

            if len(self.cache_data) > self.MAX_ITEMS:
                first = [i for i in self.cache_data.items()][0][0]
                print("DISCARD: {}".format(first))
                del self.cache_data[first]

    def get(self, key):
        ''' This retrieves an item from the cache '''

        return self.cache_data.get(key, None)
