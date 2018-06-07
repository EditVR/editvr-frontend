/**
 * @file ExperienceEdit.js
 * Exports a React component that renders EditVR's experience edit page.
 */

import React from 'react';
import PropTypes from 'prop-types';

import { DashboardLayout } from '../../layouts';
import { ExperienceForm } from '../../components';

const ExperienceEdit = ({
  experiences,
  match: {
    params: { experienceSlug }
  }
}) => {
  const experience = experiences.items.find(
    item => item.field_experience_path === experienceSlug
  );

  return (
    <DashboardLayout title={`Edit ${experience.title}`}>
      <ExperienceForm experienceSlug={experienceSlug} />
    </DashboardLayout>
  );
};

ExperienceEdit.propTypes = {
  experiences: PropTypes.shape({
    items: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        body: PropTypes.PropTypes.shape({
          value: PropTypes.string
        }),
        field_experience_path: PropTypes.string.isRequired
      })
    ).isRequired
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      experienceSlug: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};

export default ExperienceEdit;
