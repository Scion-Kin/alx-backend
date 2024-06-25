#!/usr/bin/env python3
''' This module defines a class '''

from base_caching import BaseCaching as Base


class BasicCache(Base):
    ''' This improves the base class's methods
        for getting and inserting '''

    def put(self, key, item):
        ''' This insert an item into the cache '''

        if key is not None and item is not None:
            self.cache_data[key] = item

    def get(self, key):
        ''' This retrieves an item from the cache '''

        return self.cache_data.get(key, None)
