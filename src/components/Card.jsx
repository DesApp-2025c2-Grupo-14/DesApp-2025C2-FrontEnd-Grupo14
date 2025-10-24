import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export function BasicCard(props) {
  const { id, nombreSolicitud, descripcion, fecha, selected, onSelect, onAnalizar } = props;

  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const isMedium = useMediaQuery(theme.breakpoints.between("sm", "md"));

  return (
    <Card
      onClick={() => onSelect(id)}
      sx={{
        width: "100%",
        maxWidth: isSmall ? "95%" : isMedium ? "80%" : 500,
        p: isSmall ? 2 : 3,
        m: "auto",
        mb: 3,
        borderRadius: 5,
        display: "flex",
        flexDirection: isSmall ? "column" : "row",
        justifyContent: "space-between",
        alignItems: isSmall ? "flex-start" : "center",
        cursor: "pointer",
        border: selected ? "2px solid black" : "1px solid transparent",
        boxShadow: selected ? 4 : 1,
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          boxShadow: 3,
        },
      }}
    >
      <CardContent
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: isSmall ? 1.5 : 2,
          width: "100%",
        }}
      >
        <Typography variant={isSmall ? "h6" : "h5"} component="div" noWrap={!isSmall}>
          {nombreSolicitud}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: isSmall ? 3 : 4,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {descripcion}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            textAlign: "right",
            fontSize: isSmall ? "0.8rem" : "0.9rem",
            color: "text.secondary",
          }}
        >
          {fecha}
        </Typography>
      </CardContent>

      <CardActions
        sx={{
          display: "flex",
          justifyContent: isSmall ? "flex-end" : "center",
          width: isSmall ? "100%" : "auto",
          mt: isSmall ? 1 : 0,
        }}
      >
        <Button
          variant="contained"
          size={isSmall ? "small" : "medium"}
          sx={{
            bgcolor: "#2E4CA6",
            "&:hover": { bgcolor: "#1e3574" },
            width: isSmall ? "100%" : "auto",
          }}
          onClick={(e) => {
            e.stopPropagation(); // evita que el click seleccione la card
            onAnalizar();
          }}
        >
          Analizar
        </Button>
      </CardActions>
    </Card>
  );
}
