import { useFormik } from "formik";
import * as Yup from "yup";
import { initialValues } from "./schemas";
import { Container, Grid, TextField, Button, Box } from "@material-ui/core";
import { useState } from "react";
import { useAuth } from "../../contexts/Auth";
import { useLanguage } from "../../contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import "./login.styles.css";
import logo from "../../image/logo.png";

const Login = () => {
  const navigate = useNavigate();
  const [wrongPassword, setWrongPassword] = useState(false);
  const { login } = useAuth();
  const { t } = useLanguage();

  const handleLogin = ({ username, password }) => {
    const jwt = login({ username, password });
    if (!jwt) return setWrongPassword(true);
    setWrongPassword(false);
    navigate("/inicio");
  };

  // Definición dinámica del esquema para soportar traducciones instantáneas
  const validationSchema = Yup.object({
    username: Yup.string().required(t("login_validation_user")),
    password: Yup.string().required(t("login_validation_pass")),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: ({ username, password }) => {
      handleLogin({ username, password });
    },
  });

  return (
    <Container className="container_login">
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={12} md={6} className="login_panel">
          <form onSubmit={formik.handleSubmit}>
            <img src={logo} className="logo2" alt="logo" width="70" />
            <p className="login_kicker">{t("login_kicker")}</p>
            <h1 className="titulo">{t("login_title")}</h1>
            <Box mt={4}>
              <TextField
                type="text"
                name="username"
                label={t("login_user")}
                onChange={formik.handleChange}
                error={formik.errors.username}
                fullWidth
              />
              {formik?.errors?.username && (
                <span className="form_error">{formik.errors.username}</span>
              )}
            </Box>
            <Box mt={1}>
              <TextField
                type="password"
                name="password"
                label={t("login_pass")}
                onChange={formik.handleChange}
                error={formik.errors.password}
                fullWidth
              />
              {formik?.errors?.password && (
                <span className="form_error">{formik.errors.password}</span>
              )}
            </Box>
            <Box mt={3}>
              <Button
                fullWidth
                type="submit"
                size="small"
                variant="contained"
                color="primary"
              >
                {t("login_btn")}
              </Button>
            </Box>
          </form>
          {wrongPassword && (
            <span className="form_error">{t("login_error")}</span>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
