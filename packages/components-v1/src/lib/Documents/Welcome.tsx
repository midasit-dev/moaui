import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'

const ReadmeContent = () => {
  const [readmeContent, setReadmeContent] = useState('');

  useEffect(() => {
    const fetchReadme = async () => {
      try {
        const response = await fetch('https://raw.githubusercontent.com/midasit-dev/moaui/main/README.md');
        if (!response.ok) {
          throw new Error('Failed to fetch README.md');
        }
        const markdownContent = await response.text();
        setReadmeContent(markdownContent);
      } catch (error) {
        console.error('Error fetching README.md:', error);
      }
    };

    fetchReadme();
  }, []);

  return (
    <div>
			<ReactMarkdown
				children={readmeContent}
				rehypePlugins={[rehypeRaw, rehypeSanitize]}
			/>
    </div>
  );
};

export default ReadmeContent;