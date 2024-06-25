#!/usr/bin/env python3
''' This module defines a class '''

from base_caching import BaseCaching as Base


class MRUCache(Base):
    ''' Improves the base class '''

    def put(self, key, item):
        ''' This insert an item into the cache and
            moves the item to the front of the queue '''

        if key is not None and item is not None:
            li = [(i, j) for i, j in self.cache_data.items() if i != key]

            if len(li) == self.MAX_ITEMS:
                print("DISCARD: {}".format(li[0][0]))
                li.pop(0)

            li = [(key, item)] + li
            self.cache_data = dict(li)

    def get(self, key):
        ''' This retrieves an item from the cache and
            moves the accessed item to the front of the queue '''

        li = [(i, j) for i, j in self.cache_data.items() if i != key]
        if key in self.cache_data:
            self.cache_data = dict([(key, self.cache_data[key])] + li)

        return self.cache_data.get(key, None)
