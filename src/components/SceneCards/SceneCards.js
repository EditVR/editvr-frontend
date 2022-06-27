/**
 * @file SceneCards.js
 * Exports a component that renders cards for all of the scenes included in the
 * experience that's currently open.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import {
  withStyles,
  Typography,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Button,
  Tooltip,
  TextField
} from '@material-ui/core';
import { OpenInBrowser, Edit, DeleteForever } from '@material-ui/icons';

import SceneCardsStyles from './SceneCards.style';
import {
  MODE_SCENE_EDIT,
  FORM_MESSAGE_DELETE_SCENE_CONFIRM,
  OPEN_EXPERIENCE_SCENE_DELETE
} from '../../constants';
import parseSkyFromScene from '../../lib/parseSkyFromScene';

class SceneCards extends Component {
  static propTypes = {
    classes: PropTypes.shape({}).isRequired,
    user: PropTypes.shape({
      username: PropTypes.string.isRequired
    }).isRequired,
    experience: PropTypes.shape({
      item: PropTypes.shape({
        scenes: PropTypes.objectOf(
          PropTypes.shape({
            id: PropTypes.string,
            title: PropTypes.string,
            field_slug: PropTypes.string,
            field_photosphere: PropTypes.shape({
              meta: PropTypes.shape({
                derivatives: PropTypes.shape({
                  sc: PropTypes.string
                })
              })
            })
          })
        )
      })
    }).isRequired,
    history: PropTypes.shape({
      location: PropTypes.shape({
        pathname: PropTypes.string.isRequired
      }).isRequired
    }).isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        experienceSlug: PropTypes.string.isRequired,
        sceneSlug: PropTypes.string
      }).isRequired
    }).isRequired,
    dispatch: PropTypes.func.isRequired
  };

  /**
   * Dispatches an action to delete the specified scene.
   */
  removeScene = (id, sceneSlug) => {
    const {
      dispatch,
      user,
      experience: { item: experience },
      history: {
        replace,
        location: { pathname: location }
      }
    } = this.props;

    dispatch({
      type: OPEN_EXPERIENCE_SCENE_DELETE,
      id,
      sceneSlug,
      user,
      successHandler: () => {
        const experiencePath = `/experience/vreditor/${
          experience.field_experience_path
        }`;
        const scenePath = `${experiencePath}/${sceneSlug}`;

        // Unload scene on sucessfull delete if loaded.
        if (location === scenePath) {
          replace(experiencePath);
        }
      }
    });
  };

  /**
   * {@inheretdoc}
   */
  render() {
    const {
      experience: { item: experience },
      user: { username },
      classes,
      history: {
        location: { pathname: location }
      },
      match: {
        params: { sceneSlug }
      }
    } = this.props;

    return (
      <div>
        {experience.scenes &&
          Object.entries(experience.scenes).map(([id, scene]) => {
            const { title, body, field_slug: slug } = scene;
            const openPath = `/experience/vreditor/${
              experience.field_experience_path
            }/${slug}`;
            const editPath = `/experience/vreditor/${
              experience.field_experience_path
            }/${slug}/${MODE_SCENE_EDIT}`;
            const sharePath = `${
              window.location.origin
            }/experience/${username}/${
              experience.field_experience_path
            }/${slug}`;
            const sky = parseSkyFromScene(scene, true);

            return (
              <Card
                key={id}
                raised={sceneSlug === slug}
                className={classNames(classes.card, {
                  [classes.cardActive]: sceneSlug === slug
                })}
              >
                {sky && (
                  <CardMedia
                    className={classes.cardMedia}
                    title={title}
                    image={sky.url}
                  />
                )}
                <CardContent>
                  <Typography gutterBottom variant="headline">
                    {title}
                  </Typography>
                  <Typography
                    component="p"
                    dangerouslySetInnerHTML={{
                      __html: body
                        ? body.value
                        : 'This scene does not yet have a description.'
                    }}
                  />
                  <TextField
                    className={classes.share}
                    label="Share Link"
                    value={sharePath}
                  />
                </CardContent>
                <CardActions>
                  <Tooltip title={`Open ${title}`}>
                    <Button
                      variant="outlined"
                      size="small"
                      component={Link}
                      className={classes.cardActionButton}
                      disabled={location === openPath}
                      to={openPath}
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
                      disabled={location === editPath}
                      to={editPath}
                    >
                      <Edit />
                    </Button>
                  </Tooltip>
                  <Tooltip title={`Delete ${title}`}>
                    <Button
                      onClick={e => {
                        e.preventDefault();
                        if (window.confirm(FORM_MESSAGE_DELETE_SCENE_CONFIRM)) {
                          this.removeScene(scene.id, id);
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
            );
          })}
      </div>
    );
  }
}

export default withStyles(SceneCardsStyles)(SceneCards);
