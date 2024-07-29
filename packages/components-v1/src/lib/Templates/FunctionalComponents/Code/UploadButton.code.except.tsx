import { useState, useCallback, useRef, useEffect } from "react";
import { Button, type ButtonProps } from '@midasit-dev/moaui-components-v1';

interface OnAfterUploadType {
	[key: string]: any;
}

interface UploadButtonProps {
	onAfterUpload?: (data: OnAfterUploadType) => void;
	buttonProps?: Omit<ButtonProps, 'children'>;
	buttonName?: string;
}

const TemplatesFunctionalComponentsUploadButton = (props: UploadButtonProps) => {
	const { 
		onAfterUpload, 
		buttonProps,
		buttonName,
	} = props;

	const inputRef = useRef<HTMLInputElement>(null);
	const [uploadedData, setUploadedData] = useState(null);

	const handleClick = useCallback(() => {
		if (inputRef.current) {
			inputRef.current.click();
		}
	}, []);

  const handleUpload = useCallback((e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
				if (!e.target) return;
				if (e.target.result === null) return;
				if (e.target.result instanceof ArrayBuffer) return;

        const data = JSON.parse(e.target.result);
        setUploadedData(data);
      } catch (error) {
        console.error("Error parsing JSON file:", error);
      }
    };
    reader.readAsText(file);
  }, []);

	useEffect(() => {
		if (uploadedData && onAfterUpload) {
			onAfterUpload(uploadedData);
		}
	}, [onAfterUpload, uploadedData]);

  return (
    <label htmlFor="upload-button">
      <input
				ref={inputRef}
        id="upload-button"
        type="file"
        onChange={handleUpload}
        style={{ display: "none" }}
      />
			<Button onClick={handleClick} {...buttonProps}>
				{buttonName ?? "Upload"}
			</Button>
    </label>
  );
};

export default TemplatesFunctionalComponentsUploadButton;
