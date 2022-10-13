import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'

export default function Copyright(): JSX.Element {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}.
    </Typography>
  )
}
