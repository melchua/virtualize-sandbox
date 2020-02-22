import React from "react";
import "./App.css";
import { LoremIpsum } from "lorem-ipsum";
import Faker from "faker";
import {
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
  List,
  WindowScroller
} from "react-virtualized";

function createRecord(count) {
  let records = [];

  for (let i = 0; i < count; i++) {
    const lorem = new LoremIpsum({
      count: 1,
      units: "sentences",
      sentenceLowerBound: 4,
      sentenceUpperBound: 8
    });
    records.push({
      username: Faker.internet.userName(),
      email: Faker.internet.email(),
      text: lorem.generateParagraphs(1)
    });
  }
  return records;
}

function App() {
  const records = createRecord(10000);

  let cache = new CellMeasurerCache({
    fixedWidth: true,
    defaultHeight: 100
  });
  const rowRenderer = ({ index, key, parent, style }) => {
    return (
      <CellMeasurer
        key={key}
        cache={cache}
        parent={parent}
        columnIndex={0}
        rowIndex={index}
      >
        <div
          className="row"
          key={key}
          style={{
            ...style,
            display: "flex",
            flexDirection: "column"
          }}
        >
          <div style={{ display: "flex", flexDirection: "row" }}>
            <span style={{ width: 200 }}>{records[index].username}</span>
            <span style={{ width: 200 }}>{records[index].email}</span>
          </div>
          <div style={{ width: 400, color: "#B3B8E9", margin: "5px 0" }}>
            {records[index].text}
          </div>
        </div>
      </CellMeasurer>
    );
  };
  // AutoSizer calculates height and width of the parent
  return (
    <div className="app">
      <div className="inside" style={{ height: "100vh", width: "50%" }}>
        <WindowScroller>
          {({ height, isScrolling, onChildScroll, scrollTop }) => (
            <AutoSizer>
              {({ width }) => (
                <List
                  width={width}
                  height={height}
                  rowCount={records.length}
                  rowRenderer={rowRenderer}
                  headerHeight={20}
                  overscanRowCount={3}
                  deferredMeasurementCache={cache}
                  rowHeight={cache.rowHeight}
                  isScrolling={isScrolling}
                  onScroll={onChildScroll}
                  scrollTop={scrollTop}
                  autoH
                />
              )}
            </AutoSizer>
          )}
        </WindowScroller>
      </div>
    </div>
  );
}

export default App;
