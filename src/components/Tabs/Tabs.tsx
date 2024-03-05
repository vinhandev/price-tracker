import { ReactNode, useState } from 'react';
import { useStore } from '../../store/useStore';

type Props = {
  data: {
    label: string;
    tab: ReactNode;
  }[];
};
export default function Tabs({ data }: Props) {
  const isDarkMode = useStore((state) => state.isDarkMode);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  return (
    <div
      style={{
        padding: 20,
      }}
    >
      <div>
        <div className="flex-row d-flex" style={{ gap: 20 }}>
          {data.map((item, index) => (
            <div
              style={{
                paddingTop: 10,
                paddingBottom: 10,
                paddingLeft: 0,
                paddingRight: 0,

                fontWeight: activeIndex === index ? '700' : '600',
                fontSize: 20,
                color:
                  activeIndex === index
                    ? isDarkMode
                      ? 'white'
                      : 'black'
                    : 'gray',
              }}
              onClick={() => setActiveIndex(index)}
            >
              {item.label}
            </div>
          ))}
        </div>
        <div className="d-flex flex-row">
          {data?.map((item, index) => (
            <div
              style={{
                width: activeIndex === index ? '100%' : 0,
                height: '100%',
                opacity: activeIndex === index ? 1 : 0,
                transition: 'width 0.5s, opacity 0.5s',
              }}
            >
              {item.tab}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
