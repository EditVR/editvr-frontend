/**
 * @file SceneCards.js
 * Exports a component that renders cards for all of the scenes included in the
 * experience that's currently open.
 */

import React from 'react';
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
  Tooltip
} from '@material-ui/core';
import { OpenInBrowser, Edit } from '@material-ui/icons';

import SceneCardsStyles from './SceneCards.style';
import { MODE_SCENE_EDIT } from '../../constants';

const SceneCards = ({
  experience: { item: experience },
  classes,
  history: {
    location: { pathname: location }
  },
  match: {
    params: { sceneSlug }
  }
}) => (
  <div>
    {experience.field_scenes &&
      experience.field_scenes.map(
        ({
          id,
          title,
          body,
          field_slug: slug,
          field_photosphere: photosphere
        }) => {
          const openPath = `/experience/vreditor/${
            experience.field_experience_path
          }/${slug}`;
          const editPath = `/experience/vreditor/${
            experience.field_experience_path
          }/${slug}/${MODE_SCENE_EDIT}`;

          return (
            <Card
              key={id}
              raised={sceneSlug === slug}
              className={classNames(classes.card, {
                [classes.cardActive]: sceneSlug === slug
              })}
            >
              {photosphere &&
                photosphere.meta.derivatives && (
                  <CardMedia
                    className={classes.cardMedia}
                    title={title}
                    image={photosphere.meta.derivatives.sc}
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
              </CardActions>
            </Card>
          );
        }
      )}
  </div>
);

SceneCards.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  experience: PropTypes.shape({
    item: PropTypes.shape({
      field_scenes: PropTypes.arrayOf(
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
  }).isRequired
};

export default withStyles(SceneCardsStyles)(SceneCards);
