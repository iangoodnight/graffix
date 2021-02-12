import modalStyles from './OrderSuccessModal.module.scss';

const OrderSuccessModal = ({ visible, handleClick }) => {
  return (
    <div
      className={`${modalStyles.modal} ${visible ? modalStyles.visible : ''}`}
    >
      <div className={modalStyles.content}>
        <h3>Great success!</h3>
        <button name="orders" onClick={handleClick}>
          Back to orders
        </button>
        <button name="add" onClick={handleClick}>
          Add another job to the same order
        </button>
        <button name="new" onClick={handleClick}>
          Create another order from scratch
        </button>
      </div>
    </div>
  );
};

export default OrderSuccessModal;
