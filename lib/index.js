import { ResponsiveLine } from '@nivo/line';
import { useState, useEffect } from 'react';
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const sampleData = [
  {
    "id": "japan",
    "color": "hsl(134, 70%, 50%)",
    "data": [
      {
        "x": "plane",
        "y": 5
      },
      {
        "x": "helicopter",
        "y": 138
      },
      {
        "x": "boat",
        "y": 243
      },
      {
        "x": "train",
        "y": 44
      },
      {
        "x": "subway",
        "y": 226
      },
      {
        "x": "bus",
        "y": 134
      },
      {
        "x": "car",
        "y": 289
      },
      {
        "x": "moto",
        "y": 227
      },
      {
        "x": "bicycle",
        "y": 107
      },
      {
        "x": "horse",
        "y": 70
      },
      {
        "x": "skateboard",
        "y": 236
      },
      {
        "x": "others",
        "y": 204
      }
    ]
  },
  {
    "id": "france",
    "color": "hsl(286, 70%, 50%)",
    "data": [
      {
        "x": "plane",
        "y": 160
      },
      {
        "x": "helicopter",
        "y": 97
      },
      {
        "x": "boat",
        "y": 21
      },
      {
        "x": "train",
        "y": 190
      },
      {
        "x": "subway",
        "y": 24
      },
      {
        "x": "bus",
        "y": 296
      },
      {
        "x": "car",
        "y": 86
      },
      {
        "x": "moto",
        "y": 121
      },
      {
        "x": "bicycle",
        "y": 33
      },
      {
        "x": "horse",
        "y": 282
      },
      {
        "x": "skateboard",
        "y": 111
      },
      {
        "x": "others",
        "y": 176
      }
    ]
  },
  {
    "id": "us",
    "color": "hsl(265, 70%, 50%)",
    "data": [
      {
        "x": "plane",
        "y": 136
      },
      {
        "x": "helicopter",
        "y": 290
      },
      {
        "x": "boat",
        "y": 191
      },
      {
        "x": "train",
        "y": 88
      },
      {
        "x": "subway",
        "y": 149
      },
      {
        "x": "bus",
        "y": 20
      },
      {
        "x": "car",
        "y": 149
      },
      {
        "x": "moto",
        "y": 236
      },
      {
        "x": "bicycle",
        "y": 57
      },
      {
        "x": "horse",
        "y": 292
      },
      {
        "x": "skateboard",
        "y": 23
      },
      {
        "x": "others",
        "y": 71
      }
    ]
  },
  {
    "id": "germany",
    "color": "hsl(284, 70%, 50%)",
    "data": [
      {
        "x": "plane",
        "y": 120
      },
      {
        "x": "helicopter",
        "y": 197
      },
      {
        "x": "boat",
        "y": 253
      },
      {
        "x": "train",
        "y": 129
      },
      {
        "x": "subway",
        "y": 48
      },
      {
        "x": "bus",
        "y": 48
      },
      {
        "x": "car",
        "y": 21
      },
      {
        "x": "moto",
        "y": 269
      },
      {
        "x": "bicycle",
        "y": 187
      },
      {
        "x": "horse",
        "y": 52
      },
      {
        "x": "skateboard",
        "y": 195
      },
      {
        "x": "others",
        "y": 233
      }
    ]
  },
  {
    "id": "norway",
    "color": "hsl(155, 70%, 50%)",
    "data": [
      {
        "x": "plane",
        "y": 12
      },
      {
        "x": "helicopter",
        "y": 271
      },
      {
        "x": "boat",
        "y": 266
      },
      {
        "x": "train",
        "y": 128
      },
      {
        "x": "subway",
        "y": 248
      },
      {
        "x": "bus",
        "y": 162
      },
      {
        "x": "car",
        "y": 186
      },
      {
        "x": "moto",
        "y": 153
      },
      {
        "x": "bicycle",
        "y": 114
      },
      {
        "x": "horse",
        "y": 145
      },
      {
        "x": "skateboard",
        "y": 83
      },
      {
        "x": "others",
        "y": 71
      }
    ]
  }
];

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.


const Component = ({  id/* see data tab */ ,options = {}}) => {
  const display = options.display || {

  };

  const [data,setData] = useState([]);
  useEffect(()=>{
    const subscription = PubSub.subscribe(`line.series.${id}`,(message,event)=>{
      console.log(event);
      setData(event.payload);
    });
    return ()=>{
      PubSub.unsubscribe(subscription);
    }
  },[]);

  return <ResponsiveLine
    data={data}
    margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
    xScale={{ type: 'point' }}
    yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: false, reverse: false }}
    yFormat=" >-.2f"
    axisTop={null}
    axisRight={null}
    axisBottom={{
      orient: 'bottom',
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'transportation',
      legendOffset: 36,
      legendPosition: 'middle'
    }}
    axisLeft={{
      orient: 'left',
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'count',
      legendOffset: -40,
      legendPosition: 'middle'
    }}
    pointSize={display.points ? 10 : 0}
    pointColor={{ theme: 'background' }}
    pointBorderWidth={2}
    pointBorderColor={{ from: 'serieColor' }}
    pointLabelYOffset={-12}
    useMesh={true}
    legends={[
      {
        anchor: 'bottom-right',
        direction: 'column',
        justify: false,
        translateX: 100,
        translateY: 0,
        itemsSpacing: 0,
        itemDirection: 'left-to-right',
        itemWidth: 80,
        itemHeight: 20,
        itemOpacity: 0.75,
        symbolSize: 12,
        symbolShape: 'circle',
        symbolBorderColor: 'rgba(0, 0, 0, .5)',
        effects: [
          {
            on: 'hover',
            style: {
              itemBackground: 'rgba(0, 0, 0, .03)',
              itemOpacity: 1
            }
          }
        ]
      }
    ]}
    {...options}
  />;
}

export const TimeScope = Component;

export default {
  render: (id,props) => {
    console.log('line series',props);
    ReactDOM.render(
      React.createElement(Component,props || {}),
      document.getElementById(id));
  }
};
