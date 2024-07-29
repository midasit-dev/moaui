import { useCallback, useEffect, useState } from "react";
import {
  GuideBox,
  Typography,
  TemplatesFunctionalComponentsUploadButton as UploadButton,
  TemplatesFunctionalComponentsDownloadButton as DownloadButton,
  TemplatesDualComponentsTypographyTextFieldSpaceBetween as TextFieldSet,
  Panel,
} from "@midasit-dev/moaui-components-v1";

/** 
 * @description Main Component
 */
const TemplatesSamplesUploadDownload = () => {
	const [valueToDownload, setValueToDownload] = useState<any>(null);

  return (
    <GuideBox show spacing={2} fill="#f1f1f3" padding={2} borderRadius={1} border="1px solid #e1e1e1">
			<Panel variant="shadow2">
				<GuideBox spacing={1}>
					<InputComponent 
						title="key1"
						onAfterChange={(title: string, value: any) => {
							//값이 변경되면 다운로드 할 값을 채워줍니다.
							setValueToDownload((prev: any) => ({ ...prev, [title]: value, }));
						}}
					/>
					<InputComponent 
						title="key2"
						onAfterChange={(title: string, value: any) => {
							//값이 변경되면 다운로드 할 값을 채워줍니다.
							setValueToDownload((prev: any) => ({ ...prev, [title]: value, }));
						}}
					/>
					<GuideBox spacing={1}>
						<Typography variant="h1">Value to download</Typography>
						<pre>{JSON.stringify(valueToDownload, null, 2)}</pre>
					</GuideBox>
				</GuideBox>
			</Panel>
      <GuideBox width="100%" spacing={1}>
        <DownloadComponent valueToDownload={valueToDownload} />
        <UploadComponent />
      </GuideBox>
    </GuideBox>
  );
};

export default TemplatesSamplesUploadDownload;

/**
 * @description Sub Components
 */

const InputComponent = (props: {
	title: string;
	onAfterChange: (title: string, value: any) => void;
}) => {
	const { title, onAfterChange } = props;
	const [value, setValue] = useState("");
  const onChange = useCallback((e: any) => {
    setValue(e.target.value);
  }, []);

	// 값이 변경될 때 실행될 함수
	useEffect(() => {
		onAfterChange(title, value);
	}, [onAfterChange, title, value]);

	return (
		<TextFieldSet 
			title={title}
			value={value} 
			onChange={onChange} 
			placeholder="enter the test value ..."
		/>
	)
}

const DownloadComponent = (props: {
	valueToDownload: any;
}) => {
	const { valueToDownload } = props;
	return (
		<Panel variant="shadow2" width="100%">
			<DownloadButton
				valueToDownload={valueToDownload}
				guideBoxProps={{
					row: true,
					width: '100%',
					horSpaceBetween: true,
				}}
				textFieldProps={{
					width: 200,
					placeholder: "temp.json",
				}}
				buttonProps={{
					color: "normal",
				}}
				buttonName="다운로드"
			/>
		</Panel>
	);
};

const UploadComponent = () => {
  //업로드 데이터를 저장할 상태를 정의 합니다.
  const [uploadData, setUploadData] = useState(null);
  const onAfterUpload = useCallback((data: any) => {
    //파일 열기 클릭 후 실제 데이터를 받아올 때 실행될 함수를 정의합니다.
    setUploadData(data);
  }, []);

  return (
    <Panel variant="shadow2" width="100%">
      <GuideBox width="100%" row spacing={2} horSpaceBetween verCenter>
        <UploadButton
          onAfterUpload={onAfterUpload}
          buttonProps={{
            color: "negative",
          }}
          buttonName="업로드"
        />
				<GuideBox spacing={1}>
					<Typography variant="h1">Uploaded</Typography>
					<pre>
						{uploadData
							? `${JSON.stringify(uploadData, null, 2)}`
							: "-"}
					</pre>
				</GuideBox>
      </GuideBox>
    </Panel>
  );
};
