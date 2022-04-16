import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import { Pagination } from 'react-bootstrap';

const Pages = observer(() => {
    const { device } = useContext(Context);
    const pagesCount = Math.ceil(device.pageTotalRecord / device.pageLimitRecord);
    const pages = [];

    for (let i = 0; i < pagesCount; i++) {
        pages.push(i + 1);
    };

    return (
        <Pagination className="mt-5">
            {pages.map(page =>
                <Pagination.Item
                    ative={page === device.currentPage}
                    onClick={() => {device.setCurrentPage(page)}}
                >
                    {page}
                </Pagination.Item>
            )}
        </Pagination>
    );
});

export default Pages;
