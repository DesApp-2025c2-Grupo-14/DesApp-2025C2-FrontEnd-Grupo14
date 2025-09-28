import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export function BasicCard(props) {
  const { id, nombreSolicitud, descripcion, fecha, selected, onSelect } = props;

  return (
    <Card
      onClick={() => onSelect(id)}
      sx={{
        minWidth: 275,
        p: "1vw",
        m: "2vw",
        borderRadius: 5,
        display: "flex",
        justifyContent: "space-between",
        cursor: "pointer",
        border: selected ? "2px solid black" : "1px solid transparent",
        boxShadow: selected ? 4 : 1,
        transition: "all 0.2s ease-in-out",
      }}
    >
      <CardContent sx={{display: "flex", flexDirection: "column", gap: 3}}>
        <Typography variant="h5" component="div">
          {nombreSolicitud}
        </Typography>

        <Typography variant="body2" >{descripcion}</Typography>

        <Typography variant="body2" sx={{textAlign: "right"}}>{fecha}</Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" size="medium" sx ={{bgcolor: '#2E4CA6'}}>
        
          Analizar
        </Button>
      </CardActions>
    </Card>
  );
}
