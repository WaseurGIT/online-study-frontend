import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";

const SubmissionCard = ({ submission }) => {
  return (
    <Card
      sx={{
        maxWidth: 360,
        borderRadius: 3,
        boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
        transition: "0.3s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 16px 40px rgba(0,0,0,0.15)",
        },
      }}
    >
      <CardMedia
        component="img"
        height="160"
        image="https://i.ibb.co.com/j9n8H7d9/4.jpg"
        alt="Assignment"
      />

      <CardContent>
        {/* Assignment ID */}
        {/* <Typography
          variant="caption"
          color="text.secondary"
          sx={{ fontWeight: 500 }}
        >
          Assignment ID
        </Typography> */}

        <Typography variant="h6" fontWeight={600} gutterBottom>
          {submission.assignmentId}
        </Typography>

        {/* Title */}
        <Typography variant="body1" fontWeight={500} mb={1}>
          {submission.assignmentTitle}
        </Typography>

        {/* Marks + Status */}
        <Stack direction="row" spacing={1} mb={2}>
          <Chip
            label={`Marks: ${submission.assignmentMarks}`}
            color="primary"
            size="small"
          />
          <Chip
            label={submission.status}
            color={submission.status === "completed" ? "success" : "warning"}
            size="small"
          />
        </Stack>

        {/* Google Docs */}
        <Box>
          <Link
            href={submission.googleDocsLink}
            target="_blank"
            rel="noopener"
            underline="hover"
            sx={{ fontSize: 14 }}
          >
            View Google Docs
          </Link>
        </Box>
      </CardContent>
    </Card>
  );
};

export default SubmissionCard;
