import { Typography, Link } from '@mui/material';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link
        target="_blank"
        rel="noopener noreferrer"
        color="inherit"
        href="https://github.com/Archisketch-Ben/monorepo-notion-helper"
      >
        monorepo-notion-helper
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default Copyright;
