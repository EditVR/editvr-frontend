/**
 * @file Dashboard.js
 * Exports a React component that render's EditVR's editorial dashboard.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  Tooltip,
  withStyles
} from '@material-ui/core';
import { AddBox, Edit, OpenInBrowser, DeleteForever } from '@material-ui/icons';

import { DashboardLayout } from '../../layouts';
import { Message } from '../../components';
import {
  EXPERIENCES_FETCH_FOR_USER,
  EXPERIENCES_DELETE,
  FORM_MESSAGE_DELETE_EXPERIENCE_CONFIRM
} from '../../constants';
import DashboardStyles from './Dashboard.style';

class Dashboard extends Component {
  static propTypes = {
    classes: PropTypes.shape({
      card: PropTypes.string.isRequired,
      buttons: PropTypes.string.isRequired,
      buttonIcon: PropTypes.string.isRequired
    }).isRequired,
    user: PropTypes.shape({
      uid: PropTypes.string.isRequired,
      authentication: PropTypes.shape({
        accessToken: PropTypes.string.isRequired,
        csrfToken: PropTypes.string.isRequired
      }).isRequired
    }).isRequired,
    experiences: PropTypes.shape({
      error: PropTypes.string,
      items: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string.isRequired,
          body: PropTypes.shape({
            value: PropTypes.string
          }),
          field_experience_path: PropTypes.string
        })
      )
    }),
    dispatch: PropTypes.func.isRequired
  };

  static defaultProps = {
    experiences: {
      error: null
    }
  };

  /**
   * {@inheretdoc}
   */
  componentWillMount() {
    const { dispatch, user } = this.props;
    dispatch({
      type: EXPERIENCES_FETCH_FOR_USER,
      user
    });
  }

  /**
   * Dispatches an action to delete the specified experience.
   */
  removeExperience = experienceID => {
    const { dispatch, user } = this.props;

    dispatch({
      type: EXPERIENCES_DELETE,
      id: experienceID,
      user
    });
  };

  /**
   * {@inheretdoc}
   */
  render() {
    const {
      classes,
      experiences: { error, items }
    } = this.props;

    return (
      <DashboardLayout title="Experiences">
        <Typography component="p">
          On this page you can create an experience, open one of your existing
          experiences for editing by clicking the Open button, or delete an
          experience by clicking the delete button.
        </Typography>
        <div className={classes.buttons}>
          <Button
            variant="raised"
            color="primary"
            component={Link}
            to="/experience/create"
          >
            Create
            <AddBox className={classes.buttonIcon} />
          </Button>
        </div>
        {error && <Message>{error}</Message>}
        {Object.entries(items).map(
          ([key, { title, id, body, field_experience_path: path }]) => (
            <Card key={key} className={classes.card}>
              <CardContent>
                <Typography gutterBottom variant="headline">
                  {title}
                </Typography>
                <Typography
                  component="p"
                  dangerouslySetInnerHTML={{
                    __html: body
                      ? body.value
                      : 'This experience does not yet have a description.'
                  }}
                />
              </CardContent>
              <CardActions>
                <Tooltip title={`Open ${title} in VR editor`}>
                  <Button
                    variant="outlined"
                    size="small"
                    component={Link}
                    className={classes.cardActionButton}
                    to={`/experience/vreditor/${path}`}
                  >
                    <OpenInBrowser />
                  </Button>
                </Tooltip>
                <Tooltip title={`Configure ${title}`}>
                  <Button
                    variant="outlined"
                    size="small"
                    component={Link}
                    className={classes.cardActionButton}
                    to={`/experience/edit/${path}`}
                  >
                    <Edit />
                  </Button>
                </Tooltip>
                <Tooltip title={`Delete ${title}`}>
                  <Button
                    onClick={e => {
                      e.preventDefault();
                      if (
                        window.confirm(FORM_MESSAGE_DELETE_EXPERIENCE_CONFIRM)
                      ) {
                        this.removeExperience(id);
                      }
                    }}
                    variant="outlined"
                    size="small"
                    className={classes.cardActionButton}
                  >
                    <DeleteForever />
                  </Button>
                </Tooltip>
              </CardActions>
            </Card>
          )
        )}
      </DashboardLayout>
    );
  }
}

export default withStyles(DashboardStyles)(Dashboard);
