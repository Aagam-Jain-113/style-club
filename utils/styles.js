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
        width: "100%",
    },
    navbarButton: {
        color: "#fff",
        textTransform: 'initial',
    }, 
    transparentBackground: {
        background: "transparent",
    },
    section: {
        marginTop: 10,
        marginBottom: 10,
    },
    error: {
        color: "#f04040"
    }

})

export default useStyles;