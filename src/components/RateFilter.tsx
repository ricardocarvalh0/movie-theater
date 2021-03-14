import React from 'react';

const rates = [2, 4, 6, 8, 10];
const RateFilter = ({ current, onClick }: {
    current: number,
    onClick: (rate: number) => void
}) => {
    return (
        <div className="rating">
            {rates.map((r) =>
                <div
                    key={r}
                    className={`star ${r <= current ? 'filled' : ''}`}
                    onClick={() => {
                        const resetFilter = current === r;
                        onClick(resetFilter ? 0 : r);
                    }}
                />
            )}
        </div>
    )
}

export default RateFilter;
