import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
    navbar: {
        backgroundColor: "#203040",
        '& a': {
            color: "#fff",
            marginLeft: 10,
        } 
    },
    main: {
        minHeight: "80vh",
    },
    footer:{
        textAlign: "center",
    },
    brand: {
        fontWeight: "bold",
        fontSize: "1.5rem",
    },
    grow: {
        flexGrow: 1,
    },
    form: {
        maxWidth: "800px",
        margin: "0 auto",
    },
    navbarButton: {
        color: "#fff",
        textTransform: 'initial',
    }, 
    transparentBackground: {
        background: "transparent",
    }

})

export default useStyles;