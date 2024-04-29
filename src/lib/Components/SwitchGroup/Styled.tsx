import { styled } from '@mui/material/styles';

import MoaStyledComponent from "../../Style/MoaStyled";
import { Typography } from '../../';

import FormGroup from '@mui/material/FormGroup';
import FormControl from '@mui/material/FormControl';
import { useEffect, useState } from 'react';

export type StyledProps = {
  /**
   * current element id
   * @defaultValue ""
   * @optional
   * @type string
   */
  id?: React.HtmlHTMLAttributes<HTMLDivElement>["id"];
	/**
	 * React Element
	 */
  children?: React.ReactElement[];
  /**
   * Value of the header text. If leave empty this field, header field will not show.
   */
  text?: string;
};

const StyledComponent = styled((props: StyledProps) => {
	const { id, text, ...rest } = props;

	const [checkedValues, setCheckedValues] = useState<string>('');
	useEffect(() => {
		if (rest && rest.children && rest.children.length > 0) {
			const values: string[] = rest.children.map((child: React.ReactElement) => child.props.checked);
			setCheckedValues(values.join(','));
		}
	}, [rest]);
	
	return (
    <div
			id={id}
			data-current-value={checkedValues}
		>
      <FormControl>
        {text && (
          <div style={{ padding: "0.25rem" }}>
            <Typography>{text}</Typography>
          </div>
        )}
        <FormGroup
          {...rest}
          style={{ paddingLeft: text ? "0.5rem" : "0rem" }}
        />
      </FormControl>
    </div>
  );

})(() => ({}));

const ThemedComponent = (props: StyledProps) => (
	<MoaStyledComponent>
		<StyledComponent {...props} />
	</MoaStyledComponent>
);
export default ThemedComponent;