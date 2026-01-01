import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { MdDelete } from "react-icons/md";
import axiosSecure from "../../api/axios";
import Swal from "sweetalert2";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthProvider";

const AssignmentCard = ({ assignment, onDelete }) => {
  const { user } = useContext(AuthContext);
  const handleDelete = async (assignment) => {
    const id = assignment._id;

    try {
      const res = await axiosSecure.delete(`/assignments/${id}`);

      if (res.data.deletedCount > 0) {
        Swal.fire("Success!", "Assignment deleted successfully.", "success");
        // update UI from parent
        onDelete(id);
      } else {
        Swal.fire("Error!", "Failed to delete assignment.", "error");
      }
    } catch (error) {
      console.error("Error deleting assignment:", error);
      Swal.fire("Error!", "Failed to delete assignment. Please try again.", "error");
    }
  };

  return (
    <div>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          sx={{ height: 140 }}
          image="https://i.ibb.co.com/d4MYYzw9/2.png"
          title=""
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {assignment.title}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {assignment.description}
          </Typography>
        </CardContent>
        <CardActions>
          {user && user.email === assignment.creatorEmail && (
            <Button onClick={() => handleDelete(assignment)} size="small">
              <MdDelete className="text-red-500 text-2xl" />
            </Button>
          )}
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default AssignmentCard;
