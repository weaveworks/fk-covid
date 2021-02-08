# FK-Covid

A Firekube distribution for inferencing COVID-19 using COVID-Net.

## Getting Started - Standalone App

We provide several ways to use FK-Covid.
The easiest way is:
  
  * Download our standalone `fk-covid-app` from https://github.com/weaveworks/fk-covid/releases/download/v0.1.1/fk-covid-app,
  * Change its mode to be executable (`chmod +x fk-covid-app`),
  * And run it `fk-covid-app`.

It will bring up a Firekube cluster with all components installed.
Then run `kubectl get svc -n kubeflow` to get IPs for accessing the UI and the object storage.


## Getting Started with Fork-Clone-Run

Please fork this repository, then clone it into your local machine,

    git clone github.com:<your user>/fk-covid

Then run the `setup.sh`

	cd fk-covid
	./setup.sh

## Getting Started with EKS

To use fk-covid on EKS, first please start an EKS cluster with `eksctl`:

	eksctl create cluster eks-covid \
	  --node-type=m5.large \
	  --nodes=2 \
	  --node-volume-size=120 \
	  --region=us-west-2 \
	  --timeout=40m

Then create your GitHub repository to store GitOps configuration. You can do it via the GItHub console, or using this script.
	
	mkdir eks-covid
	cd eks-covid
	git init
	hub create <user>/eks-covid

After you got the EKS cluster running, enable GitOps using the following commands.

	EKSCTL_EXPERIMENTAL=true eksctl \
	    enable repo \
	    --git-url=git@github.com:<user>/eks-covid \
	    --git-email=user@email.com  \
	    --cluster=eks-covid \
	    --region=us-west-2

Then install the COVID ML Profile, which is a portable profile containing all FK-Covid components. 

	EKSCTL_EXPERIMENTAL=true eksctl \
	    enable profile \
	    --git-url=git@github.com:<user>/eks-covid \
	    --git-email=user@email.com \
	    --cluster=eks-covid \
	    --region=us-west-2 \
	    git@github.com:weaveworks/covid-ml-profile

After the profile installed, wait until all PODs ready and FK-Covid can be accessed via URLs retrieved from `kubectl get svc -n kubeflow`.

When opening browser to the MinIO page, and the login page will ask you to fill in `Access Key` and `Secret Key`. Please use the default keys as `minio` and `minio123`.

## Getting Started with AKS

Please create an AKS cluster and install the AKS version of COVID ML Profile from this repo: https://github.com/berndverst/covid-net-azure-profile

## Help

We are a very friendly community and love questions, help and feedback.

If you have any questions, feedback, or problems with `fk-covid`:

* Join the discussion
  * Invite yourself to the <a href="https://slack.weave.works/" target="_blank">Weave community</a> Slack.
  * Ask a question on the [#general](https://weave-community.slack.com/messages/general/) Slack channel.
  * Join the [Weave User Group](https://www.meetup.com/pro/Weave/) and get invited to online talks, hands-on training and meetups in your area.
* [File an issue](https://github.com/weaveworks/fk-covid/issues/new).

Weaveworks follows the [CNCF Code of Conduct](https://github.com/cncf/foundation/blob/master/code-of-conduct.md). Instances of abusive, harassing, or otherwise unacceptable behavior may be reported by contacting a Weaveworks project maintainer, or Alexis Richardson (alexis@weave.works).

Your feedback is always welcome!
