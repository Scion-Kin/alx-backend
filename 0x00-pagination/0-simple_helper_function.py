#!/usr/bin/env python3
''' This defines a function '''


def index_range(page: int, page_size: int) -> tuple:
    ''' This returns index of the first and last thing on the page '''

    return ((page * page_size) - page_size, page * page_size)
