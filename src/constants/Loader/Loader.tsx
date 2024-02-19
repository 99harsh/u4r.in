import "./Style.scss";
const CardSkeleton = ({ amount }: any) => {
    const loadCards = Array(amount).fill(1);
    return loadCards.map((_, i) => (
        <div className="card-skeleton" key={i}>
            <div className="card">
                <div className="skeleton-loader dark-theme">
                    <div className="skeleton-loader-header"></div>
                    <div className="skeleton-loader-content"></div>
                    <div className="skeleton-loader-footer"></div>
                </div>
            </div>
        </div>
    ));
};
export default CardSkeleton;