import { useDispatch, useSelector } from 'react-redux';
import { increment, decrement, reset, incrementByAmount } from './counterSlice';
import { useState } from 'react';

const Counter = () => {
  const count = useSelector((state) => state.counter.count);
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState(0);
  const addValue = Number(incrementAmount) || 0;

  return (
    <section>
      <p>{count}</p>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          // justifyContent: 'center',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button
            onClick={() => {
              dispatch(increment());
            }}
          >
            +
          </button>
          <button
            onClick={() => {
              dispatch(decrement());
            }}
          >
            -
          </button>

          <input
            type="text"
            value={incrementAmount}
            onChange={(e) => setIncrementAmount(e.target.value)}
            style={{ width: 50 }}
          />
          <button onClick={() => dispatch(incrementByAmount(addValue))}>
            Add Amount
          </button>
          <button
            onClick={() => {
              dispatch(reset());
            }}
          >
            reset
          </button>
        </div>
      </div>
    </section>
  );
};

export default Counter;
