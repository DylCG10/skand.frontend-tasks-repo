import React from 'react';

export const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
    const pageNumbers = [];
    
    // console.log("pagination", totalPosts, postsPerPage);
    
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    // console.log("page numbers: ", pageNumbers);

    return (
        // <nav>
        <ul className='pagination'>
            {pageNumbers.map(number => (
            <li key={number} className='page-item'>
                <a onClick={() => paginate(number)} /*href = '!#' */ className='page-link'>
                {number}
                </a>
            </li>
            ))}
        </ul>
        // </nav>
    );
};

// export default Pagination;