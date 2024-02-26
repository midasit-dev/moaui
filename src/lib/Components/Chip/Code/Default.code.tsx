import { GuideBox, Chip } from "@midasit-dev/moaui";/**${comma}*/

const ComponentsChipDefault = () => {

	return (
    <GuideBox spacing={2}>
			<Chip size="medium" label="Chip" />
      <Chip size="medium" label="Chip" severity="success" />
			<Chip size="small" label="Chip" severity="error" />
			<Chip size="small" label="Chip" bgColor="#eee" color="red" />
			<Chip size="small" label="Chip" severity="error" disabled />
    </GuideBox>
  );
}/**${comma}*/

export default ComponentsChipDefault;
