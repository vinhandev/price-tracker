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
    <Stack spacing={2}>
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
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: '10px',
        }}
      >
        <Box
          sx={{
            width: '400px',

            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flex: 1,
            }}
          >
            <Tab title="Select Product">
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
            }}
          >
            <Tab title="Input New Website">
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  gap: '10px',

                  flex: 1,

                  paddingTop: '20px',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '5px',
                  }}
                >
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
                </Box>
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
              </Box>
            </Tab>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexGrow: 1,
          }}
        >
          <Tab title="Preview">
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
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '10px',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                  }}
                >
                  <Label label={'Photo'} />
                  <Box
                    sx={{
                      borderRadius: '10px',
                      height: '150px',
                      width: undefined,
                      aspectRatio: 1,
                      border: `1px solid rgba(228, 219, 233, 0.25)`,
                    }}
                  >
                    <img
                      src={requestParams.logo}
                      onError={() => requestParams.onChangeLogo(DEFAULT_IMAGE)}
                      style={{
                        height: '100%',
                        width: '100%',
                        borderRadius: '10px',
                      }}
                    />
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    flexGrow: 1,

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
                </Box>
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
        </Box>
      </Box>
    </Stack>
  );
}
