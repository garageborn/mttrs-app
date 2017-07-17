import React, { Component, PropTypes } from 'react'
import { injectIntl, defineMessages } from 'react-intl'
import withQuery from './index.gql'
import CategoryDialogButton from '../../components/CategoryDialogButton'
import CategoriesDialog from '../../components/CategoriesDialog'
import DialogLoading from '../../components/DialogLoading'

const messages = defineMessages({
  allCategories: { id: 'categoriesDialog.allCategories' }
})

class CategoriesDialogContainer extends Component {
  render () {
    return (
      <CategoriesDialog type={this.props.type}>
        {this.renderAllCategories()}
        {this.renderCategories()}
      </CategoriesDialog>
    )
  }

  renderAllCategories () {
    const { formatMessage } = this.props.intl
    const category = { name: formatMessage(messages.allCategories) }
    return this.renderCategory(category)
  }

  renderCategories () {
    const { categories, loading } = this.props.data
    if (loading) return this.renderLoading()
    if (!categories) return null
    return categories.map((category) => this.renderCategory(category))
  }

  renderCategory (category) {
    const { onPress } = this.props
    if (!category) return
    return <CategoryDialogButton category={category} onPress={onPress} key={category.id} />
  }

  renderLoading () {
    return (
      <DialogLoading />
    )
  }
}

CategoriesDialogContainer.propTypes = {
  onPress: PropTypes.func.isRequired,
  publisherIds: PropTypes.array.isRequired,
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired
  }).isRequired,
  data: PropTypes.shape({
    categories: PropTypes.array
  }),
  type: PropTypes.string.isRequired
}

const IntlCategoriesDialogContainer = injectIntl(CategoriesDialogContainer)
const CategoriesDialogContainerWithData = withQuery(IntlCategoriesDialogContainer)
export default CategoriesDialogContainerWithData
