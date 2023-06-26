const Transfer__table = () => {
  return (
    <section className="transfer__table">
      <div className="transfer__table-box">
        <div className="transfer__table-names">
          <div className="transfer__table-name transfer__table-id">Transfer ID</div>
          <div className="transfer__table-name transfer__table-date">Date</div>
          <div className="transfer__table-name transfer__table-email">User email</div>
          <div className="transfer__table-name transfer__table-amount">Amount</div>
          <div className="transfer__table-name transfer__table-status">Status</div>
        </div>

        <div className="transfer__table-values">
          <div className="transfer__table-empty">No transfer history</div>
        </div>
      </div>
    </section>
  );
};

export default Transfer__table;
