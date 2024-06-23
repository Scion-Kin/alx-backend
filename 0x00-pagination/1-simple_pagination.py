#!/usr/bin/env python3
''' This module defines a function '''

import csv
import math
from typing import List


class Server:
    """Server class to paginate a database of popular baby names.
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        ''' gets the page content '''

        assert isinstance(page, int) and isinstance(page_size, int)
        assert page > 0 and page_size > 0
        indexes = index_range(page, page_size)

        return self.dataset()[indexes[0]:indexes[1]]


def index_range(page: int, page_size: int) -> tuple:
    ''' This returns index of the first and last thing on the page '''

    return ((page * page_size) - page_size, page * page_size)
