/**
 * @file ExperienceEdit.container.js
 * Exports a redux-connected ExperienceEdit component.
 */

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import ExperienceEdit from './ExperienceEdit';

const mapState = ({ experiences }) => ({
  experiences
});

export default connect(mapState)(withRouter(ExperienceEdit));
