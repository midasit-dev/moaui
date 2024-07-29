import { Scrollbars, Stack, Check } from "@midasit-dev/moaui-components-v1"; /**${comma}*/

const ComponentsScrollbarsCheckGroup = () => {
  return (
    <Scrollbars
			panelProps={{
				variant: 'strock',
			}}
			width={400}
      height={287}
      title="Convertable Tendon Profile List"
      titleVariant='body2'
      titleColor='disable'
    >
      <Stack direction="column" spacing={1}>
        <Check name="Check 1" />
        <Check name="Check 2" />
        <Check name="Check 3" />
        <Check name="Check 4" />
        <Check name="Check 5" />
        <Check name="Check 6" />
        <Check name="Check 7" />
				<Check name="Check 8" />
        <Check name="Check 9" />
				<Check name="Check 10" />
				<Check name="Check 11" />
				<Check name="Check 12" />
				<Check name="Check 13" />
				<Check name="Check 14" />
				<Check name="Check 15" />
      </Stack>
    </Scrollbars>
  );
}; /**${comma}*/

export default ComponentsScrollbarsCheckGroup;
