import type React from 'react';
import { Copyright, Main, Picture } from '@notion-helper/components';
import { useState } from 'react';
import axiosLib from 'axios';
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  createTheme,
  CssBaseline,
  FormControlLabel,
  Grid,
  Link,
  Paper,
  TextField,
  ThemeProvider,
  Typography,
} from '@mui/material';
import { LockOutlined } from '@mui/icons-material';

import { API_URL } from './constants.js';

export interface AppProps {
  text: string;
}

const axios = axiosLib.default;

export const App: React.FC<AppProps> = ({ text }) => {
  const theme = createTheme();

  const [qaListId, setQaListId] = useState('');

  // const [pageId, setPageId] = useState('');

  const queryDB = () => {
    const payload = { database_id: qaListId };

    axios
      .post(`${API_URL.NOTION}/database/query`, payload)
      .then((res) => {
        console.log('🚀 ~ file: app.tsx ~ line 24 ~ .then ~ data', res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleSubmit = () => {
    queryDB();
  };

  /**
   * Notion 데이터베이스에 이미 존재하는 issue를 할당합니다.
   *
   * @param {Array<{ number: number, title: string, state: "open" | "closed", comment_count: number, url: string }>} issues
   * @returns {{
   *   pagesToCreate: Array<{ number: number, title: string, state: "open" | "closed", comment_count: number, url: string }>;
   *   pagesToUpdate: Array<{ pageId: string, number: number, title: string, state: "open" | "closed", comment_count: number, url: string }>
   * }}
   */
  // function getNotionOperations(pages) {
  //   const pagesToCreate = [];
  //   const pagesToUpdate = [];
  //   for (const page of pages) {
  //     const pageId = gitHubIssuesIdToNotionPageId[issue.number];
  //     if (pageId) {
  //       pagesToUpdate.push({
  //         ...issue,
  //         pageId,
  //       });
  //     } else {
  //       pagesToCreate.push(issue);
  //     }
  //   }
  //   return { pagesToCreate, pagesToUpdate };
  // }

  return (
    <Main>
      <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{ height: '100vh' }}>
          <CssBaseline />
          <Picture />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlined />
              </Avatar>
              <Typography component="h1" variant="h5" style={{ maxWidth: '100%' }}>
                {text} | bf44a03ccfd94bc1ba43ef3ee91be4ab | 68cc9f3094834f0bad3a602b5b33b363
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="qaList"
                  label="QA DB List Id"
                  name="qaList"
                  autoComplete="qa-list-id"
                  autoFocus
                  onChange={(e) => setQaListId(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="qaResult"
                  label="QA DB Result Id"
                  id="qaResult"
                  autoComplete="qa-result-id"
                />
                <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="입력한 Id 기억하기" />
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                  자동으로 생성하기
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      <strong>QA Test Case DB Id</strong>는 어떻게 알 수 있나요?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="#" variant="body2">
                      QA Test Case Database와 QA Test Result Database의 <strong>차이점</strong>이 뭔가요?
                    </Link>
                  </Grid>
                </Grid>
                <Copyright sx={{ mt: 5 }} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </Main>
  );
};
