import AppBar from "@material-ui/core/AppBar/index";
import Badge from "@material-ui/core/Badge/index";
import CssBaseline from "@material-ui/core/CssBaseline/index";
import Divider from "@material-ui/core/Divider/index";
import Drawer from "@material-ui/core/Drawer/index";
import IconButton from "@material-ui/core/IconButton/index";
import List from "@material-ui/core/List/index";
import { MuiThemeProvider, withStyles } from "@material-ui/core/styles/index";
import Toolbar from "@material-ui/core/Toolbar/index";
import Tooltip from "@material-ui/core/Tooltip/index";
import Typography from "@material-ui/core/Typography/index";
import ModeButton from "@material-ui/icons/Brightness4Outlined";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import MenuIcon from "@material-ui/icons/Menu";
import MicrosoftTeamsView from './msTeamsView';
import NotificationsIcon from "@material-ui/icons/Notifications";
import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import {BrowserRouter, Route} from 'react-router-dom';
import { darkMode, lightMode } from "../../common/styles/palette";
import { styles } from "../../common/styles/styles";
import ErrorBoundary from "../errorBoundary";
import { fullListItems } from "../page_objects/listItems";
import AssignGradesView from "./assignGradesView";
import CIMRequestView from "./cimRequestView";
import ContentItemView from "./contentItemView";
import DeepLinkOptions from "./deepLinkOptions";
import DeepLinkPayloadView from "./deepLinkView";
import LaunchEndpoint from "./home";
import LtiAdvView from "./ltiAdvView";
import LtiBobcatView from "./ltiBobcatView";
import NamesRolesView from "./namesRolesView";
import GroupsView from "./groupsView";
import GroupSetsView from "./groupSetsView";
import SetupView from "./setupView";
import ProctoringStartOptionsView from "./proctoringStartOptions";
import ProctoringStartActionsView from "./proctoringStartActions";
import ProctoringEndOptionsView from "./proctoringEndOptions";
import ProctoringEndActionsView from "./proctoringEndActions";
import SnackBar from "../page_objects/snackbar";

class Dashboard extends React.Component {
  state = {
    darkMode: false,
    theme: lightMode,
    open: false
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleDarkMode = evt => {
    console.log(evt);
    if (!this.state.darkMode) {
      this.setState({ theme: darkMode, darkMode: true });
    } else {
      this.setState({ theme: lightMode, darkMode: false });
    }
  };

  render() {
    const { classes } = this.props;
    let drawerList = <List>{fullListItems}</List>;

    return (
      <MuiThemeProvider theme={this.state.theme}>
        <div className={classes.root}>
          <CssBaseline/>
          <AppBar
            position="absolute"
            className={classNames(
              classes.appBar,
              this.state.open && classes.appBarShift
            )}>
            <Toolbar
              disableGutters={!this.state.open}
              className={classes.toolbar}>
              <IconButton
                color="secondary"
                aria-label="Open drawer"
                onClick={this.handleDrawerOpen}
                className={classNames(
                  classes.menuButton,
                  this.state.open && classes.menuButtonHidden
                )}>
                <MenuIcon/>
              </IconButton>
              <Typography
                component="h1"
                variant="h6"
                color="secondary"
                noWrap
                className={classes.title}>
                LTI Testing Tool
              </Typography>
              <Tooltip title={"Toggle Dark Mode"}>
                <IconButton color={"secondary"} onClick={this.handleDarkMode}>
                  <ModeButton/>
                </IconButton>
              </Tooltip>
              <IconButton color="secondary">
                <Badge badgeContent={4} color="error">
                  <NotificationsIcon/>
                </Badge>
              </IconButton>
            </Toolbar>
          </AppBar>
          <Drawer
            variant="permanent"
            classes={{
              paper: classNames(
                classes.drawerPaper,
                !this.state.open && classes.drawerPaperClose
              )
            }}
            open={this.state.open}>
            <div className={classes.toolbarIcon}>
              <IconButton onClick={this.handleDrawerClose}>
                <ChevronLeftIcon/>
              </IconButton>
            </div>
            <Divider/>
            {drawerList}
          </Drawer>
          <ErrorBoundary>
            <main className={classes.content}>
              <div className={classes.appBarSpacer}/>
              <Route exact path="/" component={LaunchEndpoint}/>
              <Route path="/home" component={LaunchEndpoint}/>
              <Route path="/content_item" component={ContentItemView}/>
              <Route path="/cim_request" component={CIMRequestView}/>
              <Route path="/lti_adv_view" component={LtiAdvView}/>
              <Route path="/lti_bobcat_view" component={LtiBobcatView}/>
              <Route path="/setup_page" component={SetupView}/>
              <Route path="/deep_link" component={DeepLinkPayloadView}/>
              <Route path="/deep_link_options" component={DeepLinkOptions}/>
              <Route path="/names_roles_view" component={NamesRolesView}/>
              <Route path="/groups_view" component={GroupsView}/>
              <Route path="/group_sets_view" component={GroupSetsView}/>
              <Route path="/proctoring_start_options_view" component={ProctoringStartOptionsView}/>
              <Route path="/proctoring_start_actions_view" component={ProctoringStartActionsView}/>
              <Route path="/proctoring_end_options_view" component={ProctoringEndOptionsView}/>
              <Route path="/proctoring_end_actions_view" component={ProctoringEndActionsView}/>
              <Route path="/ms_teams_view" component={MicrosoftTeamsView}/>
              <Route
                path="/assign_grades_view"
                component={AssignGradesView}
              />
            </main>
            <SnackBar/>
          </ErrorBoundary>
        </div>
      </MuiThemeProvider>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Dashboard);
