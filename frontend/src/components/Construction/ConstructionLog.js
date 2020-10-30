import React, { useState } from 'react';
import Construction from './Construction';
import ConstructionTitle from './ContstructionTitle';

function ConstructionLog() {
  const newElement = {
    id: 99,
    type: 'mine',
    level: 99,
    hp: 1,
    started_at: new Date().getTime(),
    finished_at: new Date().getTime() + 600000,
  };
  const [store, setStore] = useState([
    {
      id: 1,
      type: 'first',
      level: 1,
      hp: 1,
      started_at: new Date().getTime(),
      finished_at: new Date().getTime() + 2000000,
    },
    {
      id: 2,
      type: 'asd',
      level: 2,
      hp: 1,
      started_at: 12349789,
      finished_at: 12399999,
    },
    {
      id: 3,
      type: 'mine',
      level: 5,
      hp: 1,
      started_at: 12344789,
      finished_at: 12399999,
    },
    {
      id: 4,
      type: 'farm',
      level: 1,
      hp: 1,
      started_at: 12342789,
      finished_at: 12399999,
    },
    {
      id: 5,
      type: 'farm',
      level: 2,
      hp: 1,
      started_at: 12145789,
      finished_at: 123933999,
    },
    {
      id: 6,
      type: 'farm',
      level: 2,
      hp: 1,
      started_at: 11122389,
      finished_at: 12399999,
    },
    {
      id: 7,
      type: 'farm',
      level: 1,
      hp: 1,
      started_at: 12345489,
      finished_at: 12399999,
    },
    {
      id: 8,
      type: 'farm',
      level: 6,
      hp: 1,
      started_at: new Date().getTime(),
      finished_at: new Date().getTime() + 60000000,
    },
  ]);
  const handleNewElement = () => {
    setStore([...store, newElement]);
  };
  const logs = []
    .concat(store)
    .reverse()
    .map((element, index) => {
        return (
          <Construction
            key={index}
            type={element.type}
            level={element.level}
            started_at={element.started_at}
            finished_at={element.finished_at}
          />
        );
    });
  return (
    <div>
      <ConstructionTitle />
      {logs}
      <button onClick={handleNewElement}>BUTTON</button>
    </div>
  );
}

export default ConstructionLog;
