import { Tab } from '@/HOCs';
import { Button } from '@/components';
import { Label } from '@/components/atoms';
import { Selector } from '@/components/atoms/Inputs/Selector/Selector';
import TextInput from '@/components/atoms/Inputs/TextInput/TextInput';
import { ADD_WEBSITE_STEPS, DEFAULT_IMAGE } from '@/constants';
import { GroupPriceProps } from '@/types';
import { formatMoney } from '@/utils';
import AddIcon from '@mui/icons-material/Add';
import {
  Box,
  IconButton,
  Stack,
  Step,
  StepLabel,
  Stepper,
} from '@mui/material';

export type RequestParams = {
  link: string;
  logo: string;
  selector: string;
  onChangeWebsiteLink: (websiteLink: string) => void;
  onChangeLogo: (logo: string) => void;
  onChangeSelector: (selector: string) => void;
};

export type ResponseData = {
  rawText: string;
  price: number;
};

type Props = {
  prices: GroupPriceProps[];
  product: string;
  onChangeProduct: (product: string) => void;
  activeStep: number;
  requestParams: RequestParams;
  responseData: ResponseData;
  onPreview: () => Promise<void>;
  onAddNewProduct: () => Promise<void>;
  onSubmit: () => Promise<void>;
  onDeleteWebsite?: () => Promise<void>;
};

export default function FormWebsite({
  prices,
  product,
  activeStep,
  requestParams,
  responseData,
  onAddNewProduct,
  onChangeProduct,
  onPreview,
  onSubmit,
  onDeleteWebsite,
}: Props) {
  const disabled = product === '';
  return (
    <Stack spacing={2} flex={1}>
      <Tab title="Step">
        <Stepper
          sx={{
            paddingTop: 1,
          }}
          activeStep={activeStep}
        >
          {ADD_WEBSITE_STEPS.map((label) => {
            const stepProps: { completed?: boolean } = {};
            const labelProps: {
              optional?: React.ReactNode;
            } = {};

            return (
              <Step key={label} {...stepProps}>
                <StepLabel
                  {...labelProps}
                  sx={{
                    '.MuiStepLabel-label': {
                      fontSize: '12px',
                      fontFamily: 'Roboto',
                    },
                  }}
                >
                  {label}
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </Tab>
      <Stack gap={2} direction={'row'} flex={1}>
        <Stack
          gap={2}
          sx={{
            width: '400px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flex: 1,
            }}
          >
            <Tab title="Select Product" style={{ flex: 1 }}>
              <IconButton
                onClick={onAddNewProduct}
                sx={{
                  position: 'absolute',
                  right: '20px',
                  top: '20px',
                  zIndex: 9999,

                  width: '30px',
                  height: '30px',
                }}
              >
                <AddIcon />
              </IconButton>
              <Box
                sx={{
                  paddingTop: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                }}
              >
                <Selector
                  label="Product"
                  data={
                    prices?.map((item) => ({
                      label: item.label,
                      value: item.label,
                    })) ?? []
                  }
                  value={product}
                  onChange={onChangeProduct}
                />
              </Box>
            </Tab>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexGrow: 2,
              gap: 2,
            }}
          >
            <Tab
              title="Input New Website"
              style={{
                display: 'flex',
                flex: 1,
              }}
            >
              <Stack
                flex={1}
                gap={2}
                sx={{
                  justifyContent: 'space-between',
                }}
              >
                <Stack gap={1}>
                  <TextInput
                    disabled={disabled}
                    label={'Website'}
                    value={requestParams.link}
                    onChange={requestParams.onChangeWebsiteLink}
                    errorText=""
                    isError={false}
                  />
                  <TextInput
                    disabled={disabled}
                    label={'Logo'}
                    value={requestParams.logo}
                    onChange={requestParams.onChangeLogo}
                    errorText=""
                    isError={false}
                  />
                  <TextInput
                    disabled={disabled}
                    label={'Selector'}
                    value={requestParams.selector}
                    onChange={requestParams.onChangeSelector}
                    errorText=""
                    isError={false}
                  />
                </Stack>
                <Stack>
                  <Button
                    sx={{
                      height: '50px',
                    }}
                    variant="contained"
                    disabled={disabled}
                    onClick={onPreview}
                  >
                    Preview
                  </Button>
                </Stack>
              </Stack>
            </Tab>
          </Box>
        </Stack>
        <Stack flex={1}>
          <Tab
            title="Preview"
            style={{
              display: 'flex',
              flex: 1,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '10px',

                flex: 1,

                paddingTop: '20px',
              }}
            >
              <Stack gap={2}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '10px',
                  }}
                >
                  <Stack
                    sx={{
                      gap: '10px',
                    }}
                  >
                    <Label label={'Photo'} />
                    <Stack
                      sx={{
                        borderRadius: '10px',
                        padding: 2,
                        height: '120px',
                        width: '120px',
                        border: `1px solid rgba(228, 219, 233, 0.25)`,
                      }}
                    >
                      <img
                        src={requestParams.logo}
                        onError={() =>
                          requestParams.onChangeLogo(DEFAULT_IMAGE)
                        }
                        style={{
                          height: '100%',
                          width: '100%',
                          borderRadius: '10px',
                        }}
                      />
                    </Stack>
                  </Stack>
                  <Stack
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      flex: 1,
                      gap: '10px',
                    }}
                  >
                    <TextInput
                      disabled={disabled}
                      label={'Price only numbers'}
                      value={`${responseData.price}`}
                      onChange={() => {}}
                      errorText=""
                      isError={false}
                    />
                    <TextInput
                      disabled={disabled}
                      label={'Formatted price'}
                      value={formatMoney(responseData.price)}
                      onChange={() => {}}
                      errorText=""
                      isError={false}
                    />
                  </Stack>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                  }}
                >
                  <TextInput
                    multiline
                    rows={3}
                    disabled={disabled}
                    label={'Raw Text'}
                    value={responseData.rawText}
                    onChange={() => {}}
                    errorText=""
                    isError={false}
                  />
                </Box>
              </Stack>
              <Stack direction="row" spacing={1}>
                <Button
                  sx={{
                    height: '50px',
                  }}
                  variant="contained"
                  disabled={disabled}
                  onClick={onSubmit}
                >
                  Submit
                </Button>
                {onDeleteWebsite ? (
                  <Button
                    color="error"
                    sx={{
                      height: '50px',
                    }}
                    variant="contained"
                    disabled={disabled}
                    onClick={onDeleteWebsite}
                  >
                    Delete
                  </Button>
                ) : null}
              </Stack>
            </Box>
          </Tab>
        </Stack>
      </Stack>
    </Stack>
  );
}
