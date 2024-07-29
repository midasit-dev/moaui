import { useCallback, useState } from "react";
import {
	Button,
	GuideBox,
	TextField,
	Tooltip,
	type GuideBoxProps,
	type TextFieldProps,
	type ButtonProps,
} from "@midasit-dev/moaui-components-v1";

interface DownloadButtonProps {
	valueToDownload?: any;
	guideBoxProps?: GuideBoxProps;
	textFieldProps?: TextFieldProps;
	buttonProps?: Omit<ButtonProps, 'children'>;
	buttonName?: string;
}

const TemplatesFunctionalComponentsDownloadButton = (props: DownloadButtonProps) => {
	const { 
		valueToDownload, 
		guideBoxProps,
		textFieldProps,
		buttonProps, 
		buttonName,
	} = props;

	const {
		row: rowGuideBox,
		spacing: spacingGuideBox,
		verCenter: verCenterGuideBox,
		...restGuideBoxProps
	} = guideBoxProps || {};

	const {
		value: valueTextField,
		placeholder: placeholderTextField,
		...restTextFieldProps
	} = textFieldProps || {};

  const [fileName, setFileName] = useState(valueTextField);

  const handleDownload = useCallback((fileName: any, valueToDownload: any) => {
		// 저장할 데이터가 없다면 처리 중단
		if (!valueToDownload) return;

		// JSON 데이터를 문자열로 변환
		const jsonData = JSON.stringify(valueToDownload);

		// Blob 객체 생성
		const blob = new Blob([jsonData], { type: "application/json" });

		// 파일 다운로드 링크 생성
		const url = window.URL.createObjectURL(blob);

		// 가상의 링크 클릭하여 다운로드
		const link = document.createElement("a");
		link.href = url;

		//fileName이 비어있는지 확인 합니다. 비어있다면 placeholderTextField를 fileName으로 사용합니다.
		if (!fileName || fileName === '') {
			fileName = placeholderTextField ? placeholderTextField : 'data.json';
		}

		//만약 fileName에 확장자가 없다면 .json 확장자를 붙여줍니다.
		const ext = fileName.split('.').pop();
		if (ext !== 'json') {
			fileName += '.json';
		}
		link.download = fileName;
		
		document.body.appendChild(link);
		link.click();

		// 다운로드 후 가상의 링크 제거
		document.body.removeChild(link);
		window.URL.revokeObjectURL(url);
	}, [placeholderTextField]);

  return (
    <GuideBox 
			row={rowGuideBox ?? true}
			spacing={spacingGuideBox ?? 1}
			verCenter={verCenterGuideBox ?? true}
			{...restGuideBoxProps}
		>
      <TextField
        value={fileName}
        onChange={(e: any) => setFileName(e.target.value)}
        placeholder={placeholderTextField || "data.json"}
				{...restTextFieldProps}
				disabled={!valueToDownload}
      />
			{!valueToDownload && //데이터가 없으면
				<Tooltip title="There is no value to save" placement="top">
					<Button disabled {...buttonProps}>{buttonName ?? "Download"}</Button>
				</Tooltip>
			}
			{valueToDownload && //데이터가 있으면
				<Button onClick={() => handleDownload(fileName, valueToDownload)} {...buttonProps}>
					{buttonName ?? "Download"}
				</Button>		
			}
    </GuideBox>
  );
};

export default TemplatesFunctionalComponentsDownloadButton;
