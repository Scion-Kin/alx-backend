#!/usr/bin/env python3
''' This module defines a class '''

from base_caching import BaseCaching as Base


class LIFOCache(Base):
    ''' Improves the base class '''

    def put(self, key, item):
        ''' This insert an item into the cache '''

        if key is not None and item is not None:
            if key in self.cache_data:
                del self.cache_data[key]

            self.cache_data[key] = item

            if len(self.cache_data) > self.MAX_ITEMS:
                last_in = [i for i in self.cache_data.items()][-2][0]
                print("DISCARD: {}".format(last_in))
                del self.cache_data[last_in]

    def get(self, key):
        ''' This retrieves an item from the cache '''

        return self.cache_data.get(key, None)
