import React from 'react';
import { styled } from "@mui/material/styles";
import MoaStyledComponent from "../../Style/MoaStyled";
import Box, { type BoxProps } from "@mui/material/Box";
import Tooltip, { type TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';
import { MarginTypes, MarginProps } from "../../Style/Margin";
import { PaddingTypes, PaddingProps } from "../../Style/Padding";
import { Typography, Stack, Color, Seperator, Button } from "../..";

export type StyledProps = {
	/**
	 * children of guide box
	 */
	children?: React.ReactNode;
	/**
	 * tag of guide box
	 */
	tag?: string;
	/**
	 * show guide box backgroundColor
	 */
	show?: boolean;
	/**
	 * width of block
	 *
	 * @default inherit
	 */
	width?: number | string;
  /**
   * height of block
   *
   * @default auto
   */
  height?: number | string;
  /**
   * background color of guide box
   *
   * @default rgba(240, 240, 240, 0.5)
   */
  fill?: '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | string;

	/**
	 * guide box item direction
	 * 
	 * @default column
	 */
	itemDirection?: 'column' |'row' | 'row-reverse' | 'column-reverse';
	/**
	 * guide box item direction 'column' (super option)
	 */
	column?: boolean;
	/**
	 * guide box item direction 'row' (super option)
	 */
	row?: boolean;

  /**
   * guide box item spacing, if not set, use padding value
   */
  itemSpacing?: number;

	/**
	 * guide box item center force option
	 */
	itemCenter?: boolean;
	/**
	 * guide box item center force option (super option)
	 */
	center?: boolean;

  /**
   * guide box item align horizontal option
   */
  itemHorizontalAlign?: 'left' | 'center' | 'right' | 'space-between';
	/**
	 * guide box item align horizontal option 'left' (super option)
	 */
	horLeft?: boolean;
	/**
	 * guide box item align horizontal option 'center' (super option)
	 */
	horCenter?: boolean;
	/**
	 * guide box item align horizontal option 'right' (super option)
	 */
	horRight?: boolean;
	/**
	 * guide box item align horizontal option 'space-between' (super option)
	 */
	horspaceBetween?: boolean;

	/**
	 * guide box item align veritcal option
	 */
	itemVerticalAlign?: 'top' | 'center' | 'bottom';
	/**
	 * guide box item align veritcal option 'top' (super option)
	 */
	verTop?: boolean;
	/**
	 * guide box item align veritcal option 'center' (super option)
	 */
	verCenter?: boolean;
	/**
	 * guide box item align veritcal option 'bottom' (super option)
	 */
	verBottom?: boolean;
} & MarginTypes & PaddingTypes;

const getItemDirection = (props: StyledProps): {
	condition: boolean;
	value: 'column' |'row' | 'row-reverse' | 'column-reverse';
} => {
	let condition = false;
	let value = 'column';

	if (props.column) {
		condition = true;
		value = 'column';
	} else if (props.row) {
		condition = true;
		value = 'row';
	} else if (props.itemDirection) {
		condition = true;
		value = props.itemDirection;
	} else {
		condition = false;
		value = 'column';
	}

	return {
		condition: condition,
		value: value as 'column' |'row' | 'row-reverse' | 'column-reverse',
	};
}

const getItemHorizontalAlign = (props: StyledProps) => {
	if (props.itemCenter) {
		return { condition: true, value: 'center' };
	} else if (props.center) {
		return { condition: true, value: 'center' };
	} else if (props.horLeft) {
		return { condition: true, value: 'flex-start' };
	} else if (props.horCenter) {
		return { condition: true, value: 'center' };
	} else if (props.horRight) {
		return { condition: true, value: 'flex-end' };
	} else if (props.horspaceBetween) {
		return { condition: true, value: 'space-between' };
	} else if (props.itemHorizontalAlign) {
		return { condition: true, value: props.itemHorizontalAlign };
	} else {
		return { condition: false, value: 'flex-start' };
	}
}

const getItemVerticalAlign = (props: StyledProps) => {
	if (props.itemCenter) {
		return { condition: true, value: 'center' };
	} else if (props.center) {
		return { condition: true, value: 'center' };
	} else if (props.verTop) {
		return { condition: true, value: 'flex-start' };
	} else if (props.verCenter) {
		return { condition: true, value: 'center' };
	} else if (props.verBottom) {
		return { condition: true, value: 'flex-end' };
	} else if (props.itemVerticalAlign) {
		return { condition: true, value: props.itemVerticalAlign };
	} else {
		return { condition: false, value: 'flex-start' };
	}
}

const CustomTooptip = styled(({ className, ...props }: TooltipProps) => (
	<Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
	[`& .${tooltipClasses.tooltip}`]: {
		border: `1px solid ${Color.primary.enable_strock}`,
		backgroundColor: Color.primary.enable,
		maxWidth: 200,
	},
}));

type ToolTipProperty = {
	key: string;
	condition: boolean | undefined;
	value: string;
}

//define return type of ToolTipProperties
const ToolTipProperties = (props: StyledProps, dimensions: { width: number, height: number }): Array<ToolTipProperty>  => {
	return [
		{
			key: 'tag',
			condition: (props.tag !== undefined),
			value: `${props.tag}`,
		},
    {
			key: 'width x height',
			condition: true, // 실제 크기는 항상 조건을 만족시킴
			value: `${dimensions.width.toFixed(0)}px x ${dimensions.height.toFixed(0)}px`, // 소수점 둘째자리까지 표기
    },
		{
			key: 'fill',
			condition: (props.fill !== undefined),
			value: `${props.fill}`,
		},
		{
			key: 'itemSpacing',
			condition: (props.itemSpacing !== undefined),
			value: `${props.itemSpacing}`,
		},
		{
			key: 'itemDirection',
			condition: getItemDirection(props).condition,
			value: getItemDirection(props).value,
		},
		{
			key: 'itemHorizontalAlign',
			condition: getItemHorizontalAlign(props).condition,
			value: getItemHorizontalAlign(props).value,
		},
		{
			key: 'itemVerticalAlign',
			condition: getItemVerticalAlign(props).condition,
			value: getItemVerticalAlign(props).value,
		},
  ];
}

const getBackgroundColor = (props: StyledProps): string => {
	if (!props.show) {
		return "transparent";
	} else if (props.fill) {
		if (props.fill === '0') {
			return 'rgba(240, 240, 240, 0.5)';
		} else if (props.fill === '1') {
			return 'rgba(210, 210, 210, 0.5)';
		} else if (props.fill === '2') {
			return 'rgba(180, 180, 180, 0.5)';
		} else if (props.fill === '3') {
			return 'rgba(150, 150, 150, 0.5)';
		} else if (props.fill === '4') {
			return 'rgba(120, 120, 120, 0.5)';
		} else if (props.fill === '5') {
			return 'rgba(90, 90, 90, 0.5)';
		} else if (props.fill === '6') {
			return 'rgba(60, 60, 60, 0.5)';
		} else if (props.fill === '7') {
			return 'rgba(30, 30, 30, 0.5)';
		} else if (props.fill === '8') {
			return 'rgba(0, 0, 0, 0.5)';
		} else {
			return props.fill;
		}
	} else {
		return "rgba(240, 240, 240, 0.5)";
	}
}

const GuideBox = (props: StyledProps) => {
	const { 
		children, 
		tag, 
		show, 
		width, 
		height, 
		fill, 
		itemDirection, 
		column, 
		row, 
		itemSpacing, 
		itemCenter, 
		center, 
		itemHorizontalAlign, 
		horLeft, 
		horCenter, 
		horRight, 
		horspaceBetween, 
		itemVerticalAlign, 
		verTop, 
		verCenter, 
		verBottom, 
		...rest 
	} = props;

	/**
	 * 가로 세로 사이즈 가상 DOM으로 붙어 얻어오기
	 */
	// DOM 요소에 대한 참조 생성
	const boxRef = React.useRef<HTMLDivElement>(null);

	// 실제 DOM 요소의 크기를 상태 변수로 저장
	const [dimensions, setDimensions] = React.useState({ width: 0, height: 0 });

	// setProperties와 유사하게 useEffect를 사용하여 dimensions를 업데이트
	React.useEffect(() => {
		if (boxRef.current) {
			const rect = boxRef.current.getBoundingClientRect();
			setDimensions({ width: rect.width, height: rect.height });
		}
		// props에 의존하는 useEffect의 경우 dimensions 업데이트도 props 변경에 반응해야 함
	}, [props]); // props가 변경될 때마다 실행

	/**
	 * set properties
	 */
	const [properties, setProperties] = React.useState<Array<ToolTipProperty>>([]);
	React.useEffect(() => {
		setProperties(ToolTipProperties(props, dimensions));
	}, [props, dimensions]);

	/**
	 * open & close tooltip
	 */
	const [open, setOpen] = React.useState(false);
	const handleTooltipToggle = (e: any) => {
		if (!show) return;
		e.preventDefault();
		setOpen(!open);
		e.stopPropagation();
	}
	const handleTooltipClose = (e: any) => {
		e.preventDefault();
		setOpen(false);
		e.stopPropagation();
	}

	return (
    <CustomTooptip
      disableFocusListener
      disableTouchListener
      disableHoverListener
      title={
        <Stack direction="column" spacing={1} padding={1}>
          {properties.map((property, index) => {
            if (property.key === "tag") {
              return (
                <>
                  <Typography
                    key={index}
                    variant="h1"
                    color={
                      property.condition
                        ? Color.text.primary
                        : Color.text.disable
                    }
                  >
                    {`tag: ${property.value}`}
                  </Typography>
                  <Seperator />
                </>
              );
            }

            return (
              <Typography
                key={index}
                variant="body3"
                color={
                  property.condition ? Color.text.primary : Color.text.disable
                }
              >
                {`${property.key}: ${property.value}`}
              </Typography>
            );
          })}
					<Seperator />
					<Button color="negative" onClick={handleTooltipClose}>Close</Button>
        </Stack>
      }
      placement="top"
      TransitionComponent={Zoom}
      open={open}
    >
			{/** (1)  space-between 일 경우 or (2) 일반적인 케이스 일 경우 */}
			{getItemHorizontalAlign(props).value === 'space-between' ?
				<Box
					ref={boxRef}
					width={width}
					height={height}
					{...rest}
					sx={{
						...MarginProps(props),
						...PaddingProps(props),
						backgroundColor: getBackgroundColor(props),
						opacity: open ? 0.5 : 1,
					}}
					overflow={"hidden"}
					onContextMenu={handleTooltipToggle}
				>
					<Stack
						direction={getItemDirection(props).value}
						spacing={itemSpacing}
						display={"flex"}
						justifyContent={getItemHorizontalAlign(props).value}
						alignItems={getItemVerticalAlign(props).value}
					>
						{
							props.children && 
								React.Children.map(props.children, (child, index) => (
									<React.Fragment key={index}>{child}</React.Fragment>
								))
						}
					</Stack>
				</Box>			
			:
				<Box
					ref={boxRef}
					{...rest}
					width={width}
					height={height}
					sx={{
						...MarginProps(props),
						...PaddingProps(props),
						backgroundColor: getBackgroundColor(props),
						opacity: open ? 0.5 : 1,
					}}
					overflow={"hidden"}
					onContextMenu={handleTooltipToggle}
					display={"flex"}
					justifyContent={getItemHorizontalAlign(props).value}
					alignItems={getItemHorizontalAlign(props).value}
				>
					<Stack
						direction={getItemDirection(props).value}
						spacing={itemSpacing}
					>
						{
							children && 
								React.Children.map(props.children, (child, index) => (
									<React.Fragment key={index}>{child}</React.Fragment>
								))
						}
					</Stack>
				</Box>
			}
    </CustomTooptip>
  );
}

const StyledComponent = styled((props: StyledProps): React.ReactElement => {
	return <GuideBox {...props} />;
})
(({theme}) => ({}));

const ThemedComponent = (props: StyledProps) => (
	<MoaStyledComponent>
		<StyledComponent {...props} />
	</MoaStyledComponent>
);
export default ThemedComponent;