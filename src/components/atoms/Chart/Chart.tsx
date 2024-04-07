import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

import { animated, useTransition } from 'react-spring';

import { Line } from 'react-chartjs-2';
import { useStore } from '../../../store/useStore';
import { alphaToHex, formatDate, formatMoney } from '../../../utils/helper';
import { useColors } from '@/hooks';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  List,
  ListItem,
  Typography,
} from '@mui/material';
import React, { useEffect, useMemo } from 'react';
import { getGradientMainChart } from '@/utils';
import { graphTheme } from '@/assets/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function Chart() {
  const [isShowAll, setIsShowAll] = React.useState(true);
  const [isShowDetail, setShowDetail] = React.useState(false);
  const [removedList, setRemovedList] = React.useState<string[]>([]);
  const colors = useColors();
  const labels = useStore((state) => state.labels);
  const prices = useStore((state) => state.prices);
  const product = useStore((state) => state.selectedProduct);
  const shop = useStore((state) => state.selectedShop);
  const item = prices?.find((item) => item.label === product);
  const themeIndex = useStore((state) => state.themeIndex);

  const opacity = useStore((state) => state.opacity);
  console.log(opacity, alphaToHex(opacity));
  const graphColors = graphTheme[themeIndex].map(
    (item) => `${item}${alphaToHex(opacity)}`
  );

  const sortedItems = useMemo(() => {
    if (item) {
      return item?.data
        .sort(
          (a, b) =>
            (b.data?.[b.data.length - 1].price ?? 0) -
            (a.data?.[a.data.length - 1].price ?? 0)
        )
        .map((item, index) => ({
          ...item,
          keyIndex: index,
        }))
        ?.filter((item) => (isShowAll ? true : item.name === shop))
        .sort((a, b) => {
          if (removedList.includes(a.name) && !removedList.includes(b.name)) {
            return 1;
          } else if (
            !removedList.includes(a.name) &&
            removedList.includes(b.name)
          ) {
            return -1;
          }
          return 0;
        });
    }
    return [];
  }, [item, removedList, shop, isShowAll]);

  const chartItems = useMemo(() => {
    if (item) {
      return sortedItems.filter(
        (item) => removedList.includes(item.name) === false
      );
    }
    return [];
  }, [removedList, item, sortedItems]);

  let height = 0;
  const itemHeight = 30;
  const transitions = useTransition(
    sortedItems.map((item) => ({
      ...item,
      y: (height += itemHeight) - itemHeight,
    })),
    {
      key: (item: { keyIndex: number }) => item.keyIndex,
      from: { height: 0, opacity: 0 },
      leave: { height: 0, opacity: 0 },
      enter: ({ y }) => ({ y, itemHeight, opacity: 1 }),
      update: ({ y }) => ({ y, itemHeight }),
    }
  );

  useEffect(() => {
    if (removedList.length > 0) {
      setRemovedList([]);
    }
  }, [isShowAll, shop]);

  if (!item)
    return (
      <Box
        style={{
          width: '100%',
          height: '100%',

          background: colors.background,
          borderRadius: 3,
          padding: '20px',

          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
          flex: 1,
        }}
      >
        No data
      </Box>
    );

  return (
    <Accordion
      expanded={isShowDetail}
      sx={{
        height: '100%',
        boxShadow: 'none',
        borderRadius: '10px',
        overflow: 'hidden',
      }}
    >
      <AccordionSummary
        sx={{
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
        }}
      >
        <Box
          style={{
            width: '100%',
            height: '465px',

            transition: 'background 1s ease',
            background: colors.background,
            borderRadius: 10,
            overflow: 'hidden',

            paddingRight: '20px',
            paddingTop: '20px',
            paddingBottom: '40px',

            display: 'flex',
            flex: 1,
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography
              sx={{
                fontWeight: '700',
                color: colors.text,
              }}
            >
              Chart
            </Typography>
            <FormGroup
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    sx={{
                      transform: 'scale(0.8)',
                      color: colors.primary,
                      '&.Mui-checked': {
                        color: colors.primary,
                      },
                    }}
                    defaultChecked
                    checked={isShowAll}
                    onChange={() => {
                      setIsShowAll(!isShowAll);
                    }}
                  />
                }
                label="All"
                sx={{
                  '.MuiTypography-root': {
                    color: colors.text3,
                    fontSize: '14px',
                    fontWeight: '300',
                  },
                }}
              />
              <Box
                onClick={() => setShowDetail(!isShowDetail)}
                sx={{
                  transform: isShowDetail ? 'rotate(180deg)' : 'rotate(0deg)',
                }}
              >
                <ExpandMoreIcon />
              </Box>
            </FormGroup>
          </Box>
          <Line
            style={{ paddingBottom: '20px' }}
            options={{
              plugins: {
                legend: {
                  display: false,
                },
              },
              elements: {
                line: {
                  tension: 0.4,
                },
                point: {
                  radius: 2,
                },
              },
              responsive: true,
              maintainAspectRatio: false,
              onClick: (_, elements) => {
                if (elements.length > 0) {
                  const clickedElement = elements[0];
                  const datasetIndex = clickedElement.datasetIndex;
                  const selectedData = item?.data?.[datasetIndex];
                  if (selectedData?.link) {
                    window.open(selectedData.link, '_blank');
                  }
                }
              },
            }}
            data={{
              labels:
                labels.map((item) => {
                  return formatDate(new Date(item));
                }) ?? [],
              datasets: chartItems.map((subItem) => ({
                label: subItem.name,
                data:
                  subItem?.data?.map((subItem) => {
                    if (subItem.price === -1) {
                      return undefined;
                    }
                    return subItem.price;
                  }) ?? [],

                backgroundColor: (context) =>
                  getGradientMainChart(context, graphColors),
                borderColor: !isShowAll
                  ? graphColors[0]
                  : colors.chartColors[subItem.keyIndex],
                borderWidth: 2,
                fill: !isShowAll ? true : false,
              })),
            }}
          />
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Typography
          sx={{
            fontWeight: '700',
            color: colors.text,
          }}
        >
          Last price of shops
        </Typography>
        <List
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            flexWrap: 'wrap',
            transition: 'transform 0.3s ease',
            height,
          }}
        >
          {transitions((style, subItem, t, index) => (
            <animated.div
              style={{ zIndex: sortedItems.length - index, ...style }}
              key={subItem.keyIndex}
            >
              <ListItem
                sx={{
                  padding: 0,
                  height: `${itemHeight}px`,
                  transition: 'all 0.3s ease',
                  width: '100%',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    width: '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '10px',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: '10px',
                    }}
                  >
                    <Checkbox
                      size="small"
                      color={'error'}
                      checked={!removedList.includes(subItem.name)}
                      onChange={() => {
                        if (removedList.includes(subItem.name)) {
                          setRemovedList(
                            removedList.filter((item) => item !== subItem.name)
                          );
                        } else {
                          setRemovedList([...removedList, subItem.name]);
                        }
                      }}
                      sx={{
                        width: '10px',
                        height: '10px',
                        borderRadius: '100px',
                        '&.Mui-checked': {
                          color: !isShowAll
                            ? graphColors[0]
                            : colors.chartColors[subItem.keyIndex],
                        },
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: '12px',
                        fontWeight: '400',
                        fontFamily: 'Roboto',
                      }}
                    >
                      {subItem.name}
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      fontSize: '12px',
                      fontWeight: '300',
                      fontFamily: 'Roboto',
                    }}
                  >
                    {subItem?.data?.[subItem.data.length - 1].price === -1
                      ? 'NO DATA'
                      : formatMoney(
                          subItem?.data?.[subItem.data.length - 1].price ?? 0
                        )}
                  </Typography>
                </Box>
              </ListItem>
            </animated.div>
          ))}
        </List>
      </AccordionDetails>
    </Accordion>
  );
}
