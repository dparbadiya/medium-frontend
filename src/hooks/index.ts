import { verify } from 'hono/jwt';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../config';

import { useNavigate } from 'react-router-dom';

export interface Blog {
  content: string;
  title: string;
  id: number;
  // "author": {
  //     "name": string
  // }
  autherName: string;
}

export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/blog/bulk`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((response) => {
        setBlogs(response.data.blogs);
        setLoading(false);
      });
  }, []);

  return {
    loading,
    blogs,
  };
};

export const useBlog = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog>();

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/blog/${id}`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((response) => {
        setBlog(response.data.blog);
        setLoading(false);
      });
  }, [id]);

  return {
    loading,
    blog,
  };
};

export const useVerifyToken = async () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      //   let token = localStorage.getItem('token');
      axios
        .post(
          `${BACKEND_URL}/api/v1/user/verify-token`,
          {},
          {
            headers: {
              Authorization: 'bearer ' + localStorage.getItem('token'),
            },
          }
        )
        .then((response) => {
            console.log(response.status)
            if (response.status == 200) {
            setAuth(true)
          } else {
            setAuth(false);
            navigate('/');
          }
          setLoading(false);
        })
        .catch((error) => {
            navigate('/');
        })
    } else {
      navigate('/');
    }
  }, []);

  return {
    loading,
    auth,
  };
};
