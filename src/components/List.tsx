import * as React from 'react';

export interface ListProps {
    loadingLabel: string;
    pageCount?: number;
    renderItem: (data: object[]) => React.ReactNode;
    items: object[];
    isFetching: boolean;
    onLoadMoreClick: () => void;
    nextPageUrl?: string
}

const List: React.SFC<ListProps> = ({
    loadingLabel = 'Loading',
    pageCount = 0,
    renderItem,
    items,
    isFetching = true,
    onLoadMoreClick,
    nextPageUrl
}) => {
    const renderLoadMore = () => (
        <button
            style={{ fontSize: '150%' }}
            onClick={onLoadMoreClick}
            disabled={isFetching}>
            {isFetching ? 'Loading...' : 'Load More'}
        </button>
    )

    const isEmpty = items.length === 0
    if (isEmpty && isFetching) {
        return <h2><i>{loadingLabel}</i></h2>
    }

    const isLastPage = !nextPageUrl
    if (isEmpty && isLastPage) {
        return <h1><i>Nothing here!</i></h1>
    }

    return (
        <div>
            {items.map(renderItem)}
            {pageCount > 0 && !isLastPage && renderLoadMore()}
        </div>
    )
}

export default List;